import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UsersService } from 'src/app/services/users.service';
import { IDropdownSettings } from "ng-multiselect-dropdown";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  student:any={}
 coursId:any
 cour:any={}
 students:any=[]
 affectedStudents:any=[]
 dropdownSettings: IDropdownSettings = {};

  constructor(private cService:CoursService,private activatedRoute:ActivatedRoute,
    private uService:UsersService,private router:Router) { }

  ngOnInit() {
    this.coursId = this.activatedRoute.snapshot.paramMap.get("coursId")
    if (this.coursId) {
      this.cService.getCourById( this.coursId).subscribe((res) => {
        this.cour = res.cour;
        this.affectedStudents=res.cour.students
      });

      this.uService.getAllStudents().subscribe((result)=>{
        this.students=result.students

        this.dropdownSettings = {
          singleSelection: false,
          defaultOpen: false,
          idField: "_id",
          textField: "firstName",
          selectAllText: "Select All",
          unSelectAllText: "UnSelect All",
          itemsShowLimit: 3,
          allowSearchFilter: true

        };
      })
    }
  }


  onItemSelect(item: any) {
    this.cour.students.push(item._id)
  }
  

onItemDeSelect(item: any) {
  this.cService.deleteStudentFromCour(this.coursId, item._id)
    .subscribe(
      (res) => {
        console.log( res.message);

      } 
    );
}

  
  onSelectAll(items: any) {
    for (let i = 0; i < items.length; i++) {
      this.cour.students.push(items[i]._id)
    }
  }

  onDropDownClose() {
    console.log('dropdown closed');
  }


  affecter() {
    this.cService.addStudentsToCour(this.coursId, this.affectedStudents).subscribe((res) => {
        console.log( res.message);
        if (res.message==="student  added in cour") {

          const Toast = Swal.mixin({
            toast: true,
            position: "center-start",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "student afffected in cour"
          });
        }
      },
      
    );
  
  }
  
 


}
  
