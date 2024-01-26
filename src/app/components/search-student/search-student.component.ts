import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.css']
})
export class SearchStudentComponent implements OnInit {
  searchForm : FormGroup
  search: any = { tel: '' };

  notes:any=[]
  constructor( private nService:NotesService) { }

  ngOnInit() {

  }
 

  searchNotes() {  
      this.nService.getStudentNotesByPhone(this.search.tel).subscribe(
        (res) => {
          this.notes = res.notes;
          console.log(this.notes);
          // Stockez les notes renvoyées par le backend
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des notes :', error);
          // Gérez les erreurs ici
        }
      );    
  }


 
 
}
