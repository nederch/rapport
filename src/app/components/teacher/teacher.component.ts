import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  @Input() teacher:any 
  
  @Output() newPass  = new EventEmitter <any>()
  connectedUser:any
   constructor() { }
 
   ngOnInit() {
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

   passId(){
     
     console.log("here id into child",this.teacher._id);
     this.newPass.emit(this.teacher._id)
 
   }


}
