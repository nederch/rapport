import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { AboutComponent } from './components/about/about.component';
import { ClassComponent } from './components/class/class.component';
import { RegistrComponent } from './components/registr/registr.component';
import { TeamComponent } from './components/team/team.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { BlogComponent } from './components/blog/blog.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddCourComponent } from './components/add-cour/add-cour.component';
import { TableCoursComponent } from './components/table-cours/table-cours.component';
import { CoursComponent } from './components/cours/cours.component';
import { CourDetailComponent } from './components/cour-detail/cour-detail.component';
import { CourComponent } from './components/cour/cour.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { MyFilterPipe } from './pipes/my-filter.pipe';
import { FilterCoursComponent } from './components/filter-cours/filter-cours.component';
import { AddStudentComponent } from './components/add-student/add-student.component';

import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { ResultComponent } from './components/result/result.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { ListNotesComponent } from './components/list-notes/list-notes.component';
import { SearchStudentComponent } from './components/search-student/search-student.component';
import { SearchMemberPipe } from './pipes/search-member.pipe';
import { ColorDirective } from './directives/color.directive';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BannerComponent,
    FacilitiesComponent,
    AboutComponent,
    ClassComponent,
    RegistrComponent,
    TeamComponent,
    TestimonialComponent,
    BlogComponent,
    SignupComponent,
    LoginComponent,
    TableUsersComponent,
    AddCourComponent,
    TableCoursComponent,
    CoursComponent,
    CourDetailComponent,
    CourComponent,
    TeachersComponent,
    TeacherComponent,
    MyFilterPipe,
    FilterCoursComponent,
    AddStudentComponent,
    ResultComponent,
    AddNoteComponent,
    ListNotesComponent,
    SearchStudentComponent,
    SearchMemberPipe,
    ColorDirective,
   
   
   


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
