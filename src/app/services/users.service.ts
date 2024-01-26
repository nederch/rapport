import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  userUrl = "http://localhost:3000/api"
  constructor(private http: HttpClient) { }


  signup(user: any, image: File, fichier: File) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('pdf', fichier); 
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('tel', user.tel);
    formData.append('telFils', user.telFils);
    formData.append('email', user.email);
    formData.append('adress', user.adress);
    formData.append('speciality', user.speciality);
    formData.append('password', user.password);
    formData.append('role', user.role);
    formData.append('status', user.status);
  
    // Envoyer la requête POST au backend
    return this.http.post<{ message: any, user: any }>(this.userUrl + '/signup', formData);
  }
  
 

  login(user: any) {
    return this.http.post<{message:any , user:any,role:any}>(this.userUrl + '/login', user)

  }
  getAllUsers(){
    
    return this.http.get<{users:any}>(this.userUrl+ '/users')
  }
 
  getAllTeachers(){
    return this.http.get<{teachers:any}>(this.userUrl+ '/teachers')
  }

  getAllStudents(){
    return this.http.get<{students:any}>(this.userUrl+ '/students')
  }

  getUserById(id:any){
    return this.http.get<{user:any}>(`${this.userUrl+'/users'}/${id}`)
  }




  deleteUser(id:any){
    return this.http.delete<{result:any}>(`${this.userUrl+'/users'}/${id}`)
  }

  updateUser(user:any){
    return this.http.put<{res:any}>(`${this.userUrl+'/users'}/${user._id}`,user)
  }

 

 
}
