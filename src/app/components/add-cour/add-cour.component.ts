import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-add-cour',
  templateUrl: './add-cour.component.html',
  styleUrls: ['./add-cour.component.css']
})
export class AddCourComponent implements OnInit {
  addCourForm : FormGroup
  cour: any = {}
  id: any
  teacherId:any
  coursId:any
  title: string = "ADD COUR"
  connectedUser:any
 
  
  
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private cService:CoursService,

   ) { }

  ngOnInit(): void {
    this.isLoggedIn()

    this.coursId = this.activatedRoute.snapshot.paramMap.get('coursId')
    
    if (this.coursId) {
      this.title = "EDIT COUR"
      this.getCourByIdTeacher()
    }
    
  }
  
  isLoggedIn(): Boolean {
    const connectedUser = sessionStorage.getItem('connectedUser');
    if (connectedUser) {
      const decoded = jwtDecode(connectedUser);
      if (decoded) {
        this.connectedUser=decoded
        
        console.log(this.connectedUser.role); 
        console.log(this.connectedUser.id);
        console.log(this.connectedUser.firstName);
       

      }
     
    }
     return !!connectedUser;
  }


  
  addEditCour() {
    if (this.connectedUser && this.connectedUser.id) {
      this.cour.teacherId = this.connectedUser.id;
  
      if (this.coursId) {
        //  en mode  (Edit)
        this.cService.updateCour(this.cour).subscribe(() => {
          console.log("modification effectuée");
        });
      } else {
        //  en mode  (Add)
        this.cService.addCour(this.cour).subscribe((res) => {
          console.log(res.message);
          console.log(res.teacherId);
        });
      }
      this.router.navigate(["/table-cours"])
    }
  }
  

  getCourByIdTeacher() {
    
      this.cService.getCourById( this.coursId).subscribe((res) => {
        this.cour = res.cour;
        console.log(this.cour);
      });
    
  }
  
  

  



}
