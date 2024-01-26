// import express module
const express = require('express')
// import bodyParser module
const bodyParser = require('body-parser')
// import mongoose module
const mongoose = require('mongoose');
// import bcrypt module
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const session = require('express-session');


const path = require('path');
const multer = require('multer');
mongoose.connect('mongodb://127.0.0.1:27017/kinder');

const User = require("./models/users")
const Cour = require("./models/cours");
const Note= require("./models/notes")




const { async } = require('rxjs/internal/scheduler/async');
const { log } = require('util');
const { logWarnings } = require('protractor/built/driverProviders');











// creation app express
const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/jsoneee
app.use(bodyParser.json())

app.use('/images', express.static(path.join('backend/images')))



// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

const secretKey = 'croco23';
app.use(session({
    secret: secretKey,
}));

const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValidImage = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype);
    const isValidPDF = file.mimetype === 'application/pdf';

    if (isValidImage || isValidPDF) {
      cb(null, 'backend/images'); // Répertoire de stockage pour les images et les PDF
    } else {
      cb(new Error('Mime type is invalid'));
    }
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const fileName = name + '-' + Date.now() + '.' + extension;
    cb(null, fileName);
  }
});





//Trait Logi Signup
app.post('/api/signup', multer({ storage: storage }).fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
  try {
      console.log(req.body);
      console.log(req.files); // Utiliser req.files pour accéder aux fichiers

      const hashPwd = await bcrypt.hash(req.body.password, 10);

      let url = req.protocol + '://' + req.get('host');
      let imageUrl = req.files['image'] ? url + '/images/' + req.files['image'][0].filename : null;
      let pdfUrl = req.files['pdf'] ? url + '/pdfs/' + req.files['pdf'][0].filename : null;

      let user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          tel: req.body.tel,
          email: req.body.email,
          adress: req.body.adress,
          password: hashPwd,
          role: req.body.role,
          status: req.body.status,
      });

      if (req.body.role === 'teacher') {
          user.speciality = req.body.speciality;
          user.fichier = pdfUrl;
          user.image = imageUrl;
      } else if (req.body.role === 'parent') {
          const foundStudent = await User.findOne({ tel: req.body.telFils, role: 'student' });

          if (!foundStudent) {
              return res.json({ message: "Student phone number not found" });
          }

          user.telFils = foundStudent.tel;
      } else if (req.body.role === 'student') {
          user.image = imageUrl;
      }

      const savedUser = await user.save();
      return res.json({ message: "signed", user: savedUser });
  } catch (err) {
      console.error(err);
      if (err.errors && err.errors.email) {
          return res.json({ message: "email exist" });
      } else if (err.errors && err.errors.tel) {
          return res.json({ message: "tel exist" });
      } else {
          return res.json({ message: "Error signing up" });
      }
  }
});



//Trait Logi Login
  app.post("/api/login", (req, res) => {
    let user
    User.findOne({ tel: req.body.tel })
        .then((findedUser) => {
            user = findedUser
            if (!findedUser) {
                res.json({ message: "tel invalid" })
            }
            return bcrypt.compare(req.body.password, findedUser.password)
        })
        .then((correctPwd) => {
            if (!correctPwd) {
                res.json({ message: "pwd invalid" })
            } else {
                if (user.role === "teacher" && user.status === false) {
                    res.json({ message: "Attendance validation required",user});
                 }else{
                   const finalUser = {
                       id: user._id,
                       firstName: user.firstName,
                       lastName: user.lastName,
                       tel: user.tel,
                       role: user.role,
                     };
                     const token = jwt.sign(finalUser, secretKey, { expiresIn: '1h' });
                 res.json({ message: "Login successful", user: token,role:user.role });
                 
               } 

                
            }
        })
})
  

//getallTeachers&&students
app.get("/api/users", (req, res) => {
    User.find({ role: { $in: ["teacher", "student"] } }).then((docs) => {
        res.json({ users: docs });
        // console.log(docs);
    })
});

//getAllStudents
app.get('/api/students', (req, res) => {
    User.find({ role: 'student' })
      .then(students => {
        res.json({ students }); 
      })
  });

//getAllTeachers
app.get('/api/teachers', (req, res) => {
    User.find({ role: 'teacher' })
      .then(teachers => {
        res.json({ teachers }); 
      })
  });


//trait logi getUserByid
app.get('/api/users/:id', (req, res) => {
    User.findOne({ _id: req.params.id }).then((docs) => {
        res.json({ user: docs })
    })
})

//Trait logi Get  Delete By Id
app.delete('/api/users/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id }).then(() => {
        res.json({ result: "user deleted" })
    })
})

//Trait Logi valid teacher
app.put('/api/users/:id', (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.json({ message: "user updated" });
        })
        
});

//***************************cours*********************************** */

//Trait Logi Add cour
app.post("/cours",  (req, res) => {
      console.log('Received data:', req.body);
      const { name, description, dateD, dateF, teacherId,students,notes } = req.body;
      const startDate = new Date(dateD);
      const endDate = new Date(dateF);
      const durationMs = endDate - startDate;
      const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24));
  
      const cour = new Cour({
        name: name,
        description: description,
        dateD: startDate,
        dateF: endDate,
        duree: durationDays,
        teacherId: teacherId,
        students:students,
        notes:notes 
      });
  
      cour.save().then(() => {
        res.json({ message: "cour added" ,teacherId:teacherId })
    })
  });
  

//get allcours
app.get("/cours", (req, res) => {
    Cour.find().populate('teacherId students notes').then((docs) => {
        res.json({ cours: docs })
    })
})

//get allcours pour un seul teacher
app.get("/cours/byId/:teacherId", (req, res) => {

    Cour.find({ teacherId: req.params.teacherId })
      .populate('teacherId students notes ')
      .then((docs) => {
        res.json({ cours: docs });
      })
  });


  //get students affecté a un cour
  app.get('/cours/students/:coursId', async (req, res) => {
   

      const cour = await Cour.findById(req.params.coursId).populate('students');
      if (!cour) {
        return res.status(404).json({ error: 'Course not found' });
      }
      
      res.json({ students: cour.students });
   
  });
  
  
  
//get allcours pour un seul student
app.get("/cours/student/:studentId", async (req, res) => {
    const studentId = req.params.studentId;
    const cours = await Cour.find({ students: studentId }).populate('teacherId notes');
    res.json({ cours });
}); 


  //get cour by Id 
app.get('/cours/:coursId', (req, res) => {
    console.log("111111",req.params.coursId);
    Cour.findOne({ _id:req.params.coursId })
    .populate('teacherId students notes')
      .then((docs) => {
        console.log("here ",docs);
        res.json({ cour: docs });
      })
      
  });
 
  // get un note pour un seul student dans un cour
  app.get('/cours/:coursId/student/:studentId/note', async (req, res) => {
    
      const { coursId, studentId } = req.params;
  
      const note = await Note.findOne({ coursId, studentId }).populate('studentId');
  
      if (!note) {
        return res.status(404).json({ message: 'Note not found for this student in this course' });
      }
  
      res.json({ note });
   
  });
  
  

//trait logi delete cour
app.delete('/cours/:coursId', (req, res) => {
    Cour.deleteOne({ _id: req.params.coursId }).populate('teacherId students').then(() => {
        console.log(req.params.coursId);
        res.json({ message: "cour deleted" })
    })
})


//Trait Logi Get  update cour By Id
app.put('/cours/:coursId', (req, res) => {

    Cour.updateOne({ _id: req.params.coursId }, req.body).populate('teacherId students notes').then(() => {
        res.json({ message: "cour updated" })
    })
})

//Trait Logi filter cour by date
app.post('/cours/filter', async (req, res) => {
    const { gte, lte } = req.body;
    const filteredCours = await Cour.find({
      dateD: { $gte: new Date(gte), $lte: new Date(lte) }
    });
    res.json(filteredCours);
    console.log(filteredCours);

});




//add student a un cour
app.post('/cours/:coursId', (req, res) => {
  const coursId = req.params.coursId;
  const students = req.body.affectedStudents; 

  Cour.findByIdAndUpdate(
    coursId,
    { $addToSet: { students: { $each: students } } },
    { new: true },
    (err, updatedCourse) => {
      if (err) {
        console.error( err);
        res.status(500).json({ message: ' student not added in cour' });
      } else {
        res.status(200).json({ message: 'student  added in cour' });
      }
    }
  );
});


//  trait logiq delet student from cour
app.delete('/cours/:coursId/:studentId', (req, res) => {
  const coursId = req.params.coursId;
  const studentId = req.params.studentId;
  Cour.findOneAndUpdate(
    { _id: coursId },
    { $pull: { students: studentId } },
    { new: true },
    (err, updatedCourse) => {
      if (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'étudiant du cours' });
      } else {
        res.status(200).json({ message: 'Étudiant supprimé du cours avec succès' });
      }
    }
  );
});


//*********************notes******************************************
//Trait Logi Add note
app.post('/notes/:studentId/:coursId', async (req, res) => {
  const { studentId, coursId } = req.params;
  const { valeur, evaluation } = req.body;

    const newNote = new Note({
      valeur,
      evaluation,
      studentId,
      coursId
    });

    await newNote.save();

    // Mettre à jour le tableau 'notes' dans le document du cours avec l'ID de la note nouvellement créée
    const cours = await Cour.findOne({ _id: coursId });

    if (!cours) {
      return res.status(404).json({ message: 'Course not found' });
    }

    cours.notes.push(newNote._id); // Ajouter l'ID de la nouvelle note
    await cours.save();

    res.json({ message: 'Note added and linked to course', note: newNote });
});


//get allnotes
app.get("/notes", (req, res) => {
  Note.find().populate('coursId studentId ').then((docs) => {
      res.json({ notes: docs })
  })
})

//getallnotes d'un teacher
app.get('/notes/teachers/:teacherId', async (req, res) => {
    const cours = await Cour.find({ teacherId:  req.params.teacherId }).select('_id');

    const coursId = cours.map(cour => cour._id);
   
     Note.find({ coursId: { $in: coursId } }).populate('coursId studentId').then((notes)=>{
      res.json({ notes: notes });
    });
    

});


//get allnotes pour un seul student
app.get('/notes/students/:studentId', (req, res) => {

    // Utiliser l'ID de l'étudiant pour trouver ses notes dans la base de données
   Note.find({ studentId:req.params.studentId }).populate('coursId studentId').then((studentNotes)=>{
    res.json({ notes: studentNotes });
   });

   
  
});

 
  
  
  //get note by Id 
  app.get('/notes/:noteId', (req, res) => {
    Note.findOne({ _id:req.params.noteId }).then((docs) => {
        console.log("here ",docs);
        res.json({ note: docs });
      })
      
  });
  
  //trait logi delete note
  app.delete('/notes/:noteId', (req, res) => {
  Note.deleteOne({ _id: req.params.noteId }).then(() => {
      console.log(req.params.noteId);
      res.json({ message: "note deleted" })
  })
})

//Trait Logi Get  update note By Id
app.put('/notes/:noteId', (req, res) => {
  Note.updateOne({ _id: req.params.noteId }, req.body).then(() => {
      res.json({ message: "NOTE updated" })
  })
})




//chercher notes d'un student par son tel
app.post("/notes/search", async (req, res) => {
    const user = await User.findOne({ tel:req.body.telFils, role: 'student' });
    
     Note.find({ studentId: user._id }).populate('coursId studentId').then((studentNotes)=>{
      res.json({ notes: studentNotes });
      console.log('here',studentNotes);
    });
  
  
});






// make app exportable
module.exports = app
