import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2'
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  connectedUser:any
  studentId:any
  note:any={}
  coursId:any
  cour:any={}
 
  constructor(private nService:NotesService,
    private activatedRoute:ActivatedRoute,
     private cService:CoursService ) { }

  ngOnInit() {

     this.isLoggedIn()
      
      this.studentId = this.activatedRoute.snapshot.paramMap.get("studenId");
      this.coursId = this.activatedRoute.snapshot.paramMap.get("coursId");
      if (this.coursId&&this.connectedUser) {
        this.cService.getCourById(this.coursId).subscribe((res) => {
         this.getNoteForStudentInCourse()
          this.cour = res.cour;
          console.log(this.cour);
        });
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
  // getAllNotesForStudent() {
  //   if (this.connectedUser && this.connectedUser.id) {
  //         this.studentId=this.connectedUser.id
  //         this.nService.getAllNotesForStudent(this.studentId).subscribe((res)=>{
  //           this.notes = res.notes;
  //           console.log('Notes récupérées ', this.notes);
  //         })
        
  //     }
  //   } 


    getNoteForStudentInCourse() {
      if (this.connectedUser && this.connectedUser.id) {
        this.studentId=this.connectedUser.id
        this.cService.getNoteForStudentInCourse(this.coursId, this.studentId)
        .subscribe(
          (data) => {
          
            this.note = data.note;
            console.log('Note:', this.note);
          }, (error) => {
            if (error.status === 404) {
              console.log('Note not found for this student in this course');
              const Toast = Swal.mixin({
                // Votre configuration Toast Swal
              });
              Toast.fire({
                icon: "success",
                title: "Pas de note pour vous dans ce cour"
              });
            } else {
              // Gérez d'autres erreurs, comme les erreurs serveur (statut 500, etc.)
              console.error('Error fetching note:', error);
            }
          }
         
        );
      
    }
      
    }
 
  }



