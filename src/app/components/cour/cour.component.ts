import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-cour',
  templateUrl: './cour.component.html',
  styleUrls: ['./cour.component.css']
})
export class CourComponent implements OnInit {
 @Input() cour:any 
 @Input() note:any
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
    
    console.log("here id into child",this.cour._id);
    this.newPass.emit(this.cour._id)

  }

  passNoteId(){
    
    console.log("here id into child",this.note._id);
    this.newPass.emit(this.note._id)

  }
 
 


}
