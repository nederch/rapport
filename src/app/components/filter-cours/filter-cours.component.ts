import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-filter-cours',
  templateUrl: './filter-cours.component.html',
  styleUrls: ['./filter-cours.component.css']
})
export class FilterCoursComponent implements OnInit {

  
  filterForm : FormGroup

  filter = {
    gte: '',
    lte: ''
  };

  cours:any=[]
  constructor( private cService:CoursService) { }

  ngOnInit() {
  }


  filterCours(): void {
    this.cService.filterCours(this.filter).subscribe((data) => {
        this.cours = data;
      });
  }
}
