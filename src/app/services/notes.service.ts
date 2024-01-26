import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  noteUrl="http://localhost:3000/notes"

  constructor( private http:HttpClient) { }

  addNote(note: any) {
    return this.http.post<{ message: any }>(`${this.noteUrl}/${note.studentId}/${note.coursId}`, note);
  }

  getAllNotes(){
    return this.http.get<{notes:any}>(this.noteUrl)
  }
  
    // Méthode pour récupérer les notes pour un enseignant spécifique
   getAllNotesForTeachers(teacherId:any){
    return this.http.get<{notes:any}>(`${this.noteUrl}/teachers/${teacherId}`);
  }
  //getallnotes student
  // getAllNotesForStudent(studentId:any) {
  //   return this.http.get<{notes:any}>(`${this.noteUrl}/students/${studentId}`);
  // }
 
 
  updateNote(note:any){
    return this.http.put(`${this.noteUrl}/${note._id}`,note)
  }

    
  getNoteById(noteId:any){
    console.log("neteId",noteId);
    return this.http.get<{note:any}>(`${this.noteUrl}/${noteId}`)
  }

  deleteNote(noteId:any){
    return this.http.delete<{message:any}>(`${this.noteUrl}/${noteId}`)
  }


  
  addNoteToStudent(studentId: any, coursId: any, note: any) {
    return this.http.post<{ message: string }>(`${this.noteUrl}/${studentId}/${coursId}`, note);
  }
  
  getNoteByIdStudent(studentId:any){
    return this.http.get<{ note: any }>(`${this.noteUrl}/${studentId}`);
  }
  
  getStudentNotesByPhone(tel: string) {
    const body = { telFils: tel };
    return this.http.post<{ notes: any }>(`${this.noteUrl}/search`, body);
  }
  



}

