import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
 role:any
  constructor(private formbuilder: FormBuilder , private uService:UsersService,private rout:Router) { }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      tel:['',[Validators.minLength(8), Validators.required]],
      password:['' , [Validators.minLength(3), Validators.required] ],
    })
   
   
  }
  login() {
    this.uService.login(this.loginForm.value).subscribe((res) => {
      console.log(res.message);
      console.log(res.user);
      console.log(res.role);
     this.role=res.role
  
      if (res.message === "Login successful") {
        sessionStorage.setItem('connectedUser', JSON.stringify(res.user));
        const Toast = Swal.mixin({
          // Votre configuration Toast Swal
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
  
        // Redirection en fonction du rôle après la connexion
       if (this.role==="teacher") {
        this.rout.navigate(["/table-cours"]);
       }else if (this.role==="admin") {
        this.rout.navigate(["/table-users"]);
       }else{
        this.rout.navigate(["/cours"]);
       }
          
        
      } else {
        if (res.message === "Attendance validation required") {
          const Toast = Swal.mixin({
            // Votre configuration Toast Swal pour l'erreur
          });
          Toast.fire({
            icon: "error",
            title: "wait validation Admin"
          });
        } else {
          const Toast = Swal.mixin({
            // Votre configuration Toast Swal pour l'erreur
          });
          Toast.fire({
            icon: "error",
            title: "Signed in error"
          });
        }
       
      }
    });
  }
  

}
