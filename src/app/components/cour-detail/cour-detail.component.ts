import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { jwtDecode } from "jwt-decode";
import { UsersService } from 'src/app/services/users.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-cour-detail',
  templateUrl: './cour-detail.component.html',
  styleUrls: ['./cour-detail.component.css']
})
export class CourDetailComponent implements OnInit {
  coursId: any;
  cour: any = {};

  
  constructor(private activatedRoute: ActivatedRoute, private cService: CoursService,) { }
  
  ngOnInit() {
  
    this.coursId = this.activatedRoute.snapshot.paramMap.get("coursId");
    if (this.coursId) {
      this.cService.getCourById(this.coursId).subscribe((res) => {
        this.cour = res.cour;
        console.log(this.cour);
      });
    }
  }
  
 
  
}
