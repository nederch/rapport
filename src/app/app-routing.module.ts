import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { AddCourComponent } from './components/add-cour/add-cour.component';
import { TableCoursComponent } from './components/table-cours/table-cours.component';
import { CourDetailComponent } from './components/cour-detail/cour-detail.component';
import { CoursComponent } from './components/cours/cours.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { FilterCoursComponent } from './components/filter-cours/filter-cours.component';
import { ResultComponent } from './components/result/result.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { ListNotesComponent } from './components/list-notes/list-notes.component';
import { SearchStudentComponent } from './components/search-student/search-student.component';








const routes: Routes = [
  {path:"" , component:HomeComponent},
  {path:"signup" , component:SignupComponent},
  {path:"signupAdmin" , component:SignupComponent},
  {path:"signupTeacher" , component:SignupComponent},
  {path:"signupParent" , component:SignupComponent},
  {path:"login" , component:LoginComponent},
  {path:"table-users" , component:TableUsersComponent},
  {path:"add-cour" , component:AddCourComponent},
  {path:"add-cour/:coursId" , component:AddCourComponent},
  {path:"table-cours" , component:TableCoursComponent},
  {path:"cour-detail/:coursId" , component:CourDetailComponent},
  {path:"cours" , component:CoursComponent},
  {path:"teachers" , component:TeachersComponent},
  {path:"add-student/:coursId" , component:AddStudentComponent},
  {path:"filter-cours" , component:FilterCoursComponent},
  {path:"result/:coursId" , component:ResultComponent},
  {path:"add-note" , component:AddNoteComponent},
  {path:"add-note/:noteId" , component:AddNoteComponent},
  {path:"list-notes" , component:ListNotesComponent},
  {path:"search-student" , component:SearchStudentComponent},
 
  
  
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
