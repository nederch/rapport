import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';

import Swal from 'sweetalert2'
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  cours:any=[]
  connectedUser:any
  teacherId:any
  studentId:any
  coursId:any
  noteId:any
  cour:any={}
  constructor(private cService:CoursService) { }

  ngOnInit() {
    this.isLoggedIn()
    if (this.connectedUser.role==="teacher") {
      if (this.connectedUser.id) {
        this.getAllCoursTeacher()
      }
    } else if (this.connectedUser.role==="student") {
      if (this.connectedUser.id) {
        this.getAllCoursStudent()
      }
    }else{
      this.getAllCours()
    }
  }
  
  
  isLoggedIn(): Boolean {
    const connecte = sessionStorage.getItem('connectedUser');
    if (connecte) {
      const decoded = jwtDecode(connecte);
      if (decoded) {
        this.connectedUser=decoded
        console.log(this.connectedUser.role); 
        console.log(this.connectedUser.id);
        console.log(this.connectedUser.firstName);
      }
    }
     return !!connecte;
  }


 

getAllCours() {
this.cService.getAllCours().subscribe( (res) => {
    console.log(res.cours); 
    this.cours=res.cours
  } 
);

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

getAllCoursStudent(){
  if (this.connectedUser && this.connectedUser.id) {
    this.studentId = this.connectedUser.id;
    this.cService.getAllCoursStudent(this.studentId).subscribe(
      (res) => {
        console.log(res.cours);
        this.cours = res.cours;
        if (res.cours && res.cours.length > 0) {
          this.noteId = res.cours[0].noteId; 
          console.log(this.noteId);
          // Or whichever logic fits to retrieve the noteId
        }
      },
    );
  }
}






  Delete(cour:any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((message) => {
      if (message.isConfirmed) {
        if (cour._id) {
          console.log("cour deleted");
        this.cService.deleteCour(cour._id).subscribe(()=>{
          this.getAllCours()
        }) 
        }

        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (message.dismiss === Swal.DismissReason.cancel) {
        console.log("cour not deleted");

        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  
}
