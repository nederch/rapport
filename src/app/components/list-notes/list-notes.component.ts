import { Component, OnInit } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { NotesService } from 'src/app/services/notes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {
  notes: any = []
  studentId:any
  connectedUser:any
  teacherId:any
  id:any
 
   constructor( private nService: NotesService,
    ) { }
 
    ngOnInit() {
      this.isLoggedIn();

      if (this.connectedUser.role==="teacher") {
        if (this.connectedUser.id) {
          this.getAllNotesForTeacher()
        }
      } else 
       if (this.connectedUser.role==="admin") {
        this.getAllNotes()
       }
          
       
      
      
    }
  
    isLoggedIn() {
      const connecte = sessionStorage.getItem('connectedUser');
      if (connecte) {
        const decoded = jwtDecode(connecte);
        if (decoded) {
          this.connectedUser = decoded;
          console.log(this.connectedUser.id);
          console.log(this.connectedUser.role);
          
          
        }
      }
    }
  
   
 getAllNotes() {
    this.nService.getAllNotes().subscribe( (res) => {
      console.log(res.notes); 
      this.notes=res.notes
    } 
  );
  }
 
  
 
  getAllNotesForTeacher() {
    if (this.connectedUser.id) {
      this.teacherId=this.connectedUser.id
      this.nService.getAllNotesForTeachers(this.teacherId).subscribe((res)=>{
        this.notes = res.notes;
        console.log('Notes récupérées ', this.notes);
      })
    }
  }

  // getAllNotesForStudent() {
  //   if (this.connectedUser.id) {
  //     this.studentId=this.connectedUser.id
  //     this.nService.getAllNotesForStudent(this.studentId).subscribe((res)=>{
  //       this.notes = res.notes;
  //       console.log('Notes récupérées ', this.notes);
  //     })
  //   }
  // }

  Delete(note:any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((message) => {
      if (message.isConfirmed) {
        if (note._id) {
          console.log("note deleted");
        this.nService.deleteNote(note._id).subscribe(()=>{
          this.getAllNotesForTeacher()
        }) 
        }

        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (message.dismiss === Swal.DismissReason.cancel) {
        console.log("note not deleted");

        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  }
  
 
   
 
  

 
 
 




