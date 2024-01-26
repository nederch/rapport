import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { jwtDecode } from "jwt-decode";
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
 teachers:any=[]
 
 filter:any
  connectedUser:any

  constructor(private uService:UsersService) { }

  ngOnInit() {
   
    this.getAllTeachers()
    this.isLoggedIn()
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


 

getAllTeachers() {
this.uService.getAllTeachers().subscribe( (res) => {
    console.log(res.teachers); 
    this.teachers=res.teachers
  } 
);

}



  Delete(teacher:any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((message) => {
      if (message.isConfirmed) {
        if (teacher._id) {
          console.log("cour deleted");
        this.uService.deleteUser(teacher._id).subscribe(()=>{
          this.getAllTeachers()
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
