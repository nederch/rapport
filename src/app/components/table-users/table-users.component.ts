import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent implements OnInit {
  users:any=[]
  user:any={}
  id:any
  term:any
  constructor(private uService:UsersService) { }

  ngOnInit() {
    
    this.getAllUsers()
  }

  getAllUsers(){
    this.uService.getAllUsers().subscribe((res)=>{
      this.users=res.users
      // console.log(this.users);
      
    })
  }

  getUserById() {

    this.uService.getUserById(this.id).subscribe((res)=>{
      console.log(res.user);
      this.user=res.user
      
    })
  }
  deleteUser(user:any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.uService.deleteUser(user._id).subscribe(()=>{
          this.getAllUsers()
          console.log("user deleted");
        })
        
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log("user not deleted");

        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  
  
  validTeacher(user: any) {
    Swal.fire({
      title: "Do you want to valid teacher",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        if (user.role === "teacher") {
          user.status = true;
        } 
        this.uService.updateUser(user).subscribe((res) => {
          console.log("updated",user);
          this.user=res
        });
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  
 
  
}
