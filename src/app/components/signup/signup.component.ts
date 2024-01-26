import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MustMatch } from 'src/app/shared/confirmPwd';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  email:any
  imagePreview=""
  title:string=""
  image: File;
  fichier: File;
  role:string=""
  status:Boolean
  constructor(private formBuilder: FormBuilder , private uService:UsersService,private router:Router) { }

  ngOnInit() {  
    
      // Determine the role basé sur URL path
      const path = window.location.pathname;
      
      //  paths to corresponding role and title
      const roles = {
        '/signupAdmin': { role: 'admin', title: 'SignUp Admin', status: true },
        '/signupTeacher': { role: 'teacher', title: 'SignUp Teacher', status: false },
        '/signupParent': { role: 'parent', title: 'SignUp Parent', status: true },
        '/signup' :{ role: 'student', title: 'SignUp', status: true }
      };
    
      // Set role, title, and status basé sur URL path
      const selectedRole = roles[path] 
    
      this.role = selectedRole.role;
      this.title = selectedRole.title;
      this.status = selectedRole.status;
    
      // declaration de signup avec validators
      this.signupForm = this.formBuilder.group({
        firstName: ['', [Validators.minLength(3), Validators.required]],
        lastName: ['', [Validators.minLength(3), Validators.required]],
        tel: ['', [Validators.minLength(8), Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        adress: ['', [Validators.minLength(3), Validators.required]],
        password: ['', [Validators.minLength(3), Validators.required]],
        cPassword: ['', [Validators.minLength(3), Validators.required]],
        role:selectedRole.role,
        status:selectedRole.status,
        speciality: this.role === 'teacher' ? ['', [Validators.minLength(3), Validators.required]] : null,
        telFils: this.role === 'parent' ? ['', [Validators.minLength(8), Validators.required]] : null,
      }, {
        validators: MustMatch('password', 'cPassword') 
      });
  }


     
  

  signup() {
    console.log(this.signupForm.value,this.image,this.fichier);
    this.uService.signup(this.signupForm.value,this.image,this.fichier).subscribe((res)=>{
      console.log(res.message);
      if (res.message==="signed") {
        this.router.navigate(["/login"])
      }else if(res.message==="email exist"||res.message==="tel exist"){
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "verifier votre cordonnées"
          
        });
      }else if(this.role==='parent'&& res.message === "Student phone number not found"){
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "verifier votre tel fils"
            
          });
      
       
      }
    })
  }

  //sélection du image
 
  onImageSelected(event: any) {
    const file = event.target.files[0];
    this.image=file
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  //  sélection du fichier PDF
  onFileSelected(event: any) {
    this.fichier = event.target.files[0];
  }

}
