import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-table-cours',
  templateUrl: './table-cours.component.html',
  styleUrls: ['./table-cours.component.css']
})
export class TableCoursComponent implements OnInit {
  
  cours: any = []
 connectedUser:any
 coursId:any
 cour:any={}
 teacherId:any
 role:any
  constructor( private cService: CoursService) { }

  ngOnInit(): void {
    this.isLoggedIn()
    
      this.getAllCoursTeacher()
  
    
    
    console.log(this.connectedUser.role);
      console.log(this.connectedUser.id);
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
          this.getAllCoursTeacher() 
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
