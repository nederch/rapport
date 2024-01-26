import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  courUrl="http://localhost:3000/cours"

  constructor( private http:HttpClient) { }

  addCour(cour:any){

    return this.http.post<{message:any,teacherId:any}>(this.courUrl,cour)
  }

  getAllCours(){
    return this.http.get<{cours:any}>(this.courUrl)
  }
 
  getAllCoursTeacher(teacherId: any) {
    return this.http.get<{ cours: any }>(`${this.courUrl}/byId/${teacherId}`);
  }

  //getall students dans un seul cour
  getStudentsByCoursId(coursId: any){
    return this.http.get<{students:any}>(`${this.courUrl}/students/${coursId}`);
  }

  
  
  getAllCoursStudent(studentId: any) {
    return this.http.get<{ cours: any }>(`${this.courUrl}/student/${studentId}`);
  }
  
  getCourById(coursId:any){
    console.log("coursId",coursId);
    return this.http.get<{cour:any}>(`${this.courUrl}/${coursId}`)
  }
  
  updateCour(cour:any){
    return this.http.put(`${this.courUrl}/${cour._id}`,cour)
  }
  
  deleteCour(coursId:any){
    return this.http.delete<{message:any}>(`${this.courUrl}/${coursId}`)
  }


  addStudentsToCour(coursId: any, affectedStudents: any[]) {
    return this.http.post<{ message: any }>(`${this.courUrl}/${coursId}`, { affectedStudents });
  }
  
 deleteStudentFromCour(coursId: any, studentId: any) {
  return this.http.delete<{message:any}>(`${this.courUrl}/${coursId}/${studentId}`);
 }



 filterCours(filterParams: any) {
  return this.http.post<{cours:any}>(`${this.courUrl}/filter`, filterParams);
}


getNoteForStudentInCourse(coursId: string, studentId: string) {
  const url = `${this.courUrl}/${coursId}/student/${studentId}/note`;
  return this.http.get<{note:any}>(url);
}

  
}
