import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { CoursService } from 'src/app/services/cours.service';
import { NotesService } from 'src/app/services/notes.service';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  addNoteForm : FormGroup
  note: any = {}
  cours:any=[]
  cour:any={}
  id: any
  teacherId:any
  coursId:any
  noteId:any
  title: string = "ADD Note"
  connectedUser:any
 studentId:any
 students:any=[]
  
  
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private nService:NotesService,
    private cService:CoursService,


   ) { }

  ngOnInit(): void {
    this.isLoggedIn()
    this.getAllCoursTeacher()
  

    this.coursId = this.activatedRoute.snapshot.paramMap.get('coursId');
    if (this.coursId) {
      this.onCourseSelected();
    }
   

    this.noteId = this.activatedRoute.snapshot.paramMap.get('noteId')
    if (this.noteId) {
      this.title = "EDIT NOTE"
      this.getNoteById()
      
    }
   
  }
  
  isLoggedIn(): Boolean {
    const connectedUser = sessionStorage.getItem('connectedUser');
    if (connectedUser) {
      const decoded = jwtDecode(connectedUser);
      if (decoded) {
        this.connectedUser=decoded
        
        console.log(this.connectedUser.role); 
        console.log(this.connectedUser.id);
        console.log(this.connectedUser.firstName);
       

      }
     
    }
     return !!connectedUser;
  }

  getAllCoursTeacher() {
    if (this.connectedUser && this.connectedUser.id) {
      this.teacherId=this.connectedUser.id
      this.cService.getAllCoursTeacher(this.teacherId).subscribe(
        (res) => {
          console.log(res.cours);
          this.cours = res.cours;
        },
      );
    } 
  }

 
 
  getNoteById() {
    this.nService.getNoteById(this.noteId).subscribe((res) => {
      this.note = res.note;
      this.onCourseSelected()
      console.log(this.note);
    });
  }
  
   
   getStudentsByCoursId(coursId: any) {
    this.cService.getStudentsByCoursId(coursId).subscribe(
      (res) => {
        this.students = res.students;
        console.log(this.students);
        
      },
      
    );
  }
  

  onCourseSelected() {
    if (this.note.coursId) {
      this.getStudentsByCoursId(this.note.coursId);
    }
  }
  

  addEditNote() {
    if (this.connectedUser && this.connectedUser.id) {
      if (this.noteId) {
        // Mode modification (Edit)
        this.nService.updateNote(this.note).subscribe(() => {
          console.log("Modification effectuée");
         
        });
      } else {
        // Mode ajout (Add)
        this.nService.addNote(this.note).subscribe((res) => {
          console.log(res.message);
        });
      }
     
      this.router.navigate(["/list-notes"])
    }
  }
  
  
  
}
