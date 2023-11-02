import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../../shared/models/auth-data.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn=false;
  private userType='';
  private usertypeSubject = new Subject<string>(); // Create a Subject
  private logoutSubject = new Subject<void>(); // Create a Subject for logout notification

  private token:string;
  private authStatusListener=new Subject<boolean>();
  constructor(private http:HttpClient, private router:Router){}

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
      return this.authStatusListener.asObservable();
  }

  // login(username:string,password:string){
  //   if (username=='alicia'){
  //     this.userType='user';
  //     this.loggedIn=true;
  //   }
  //   else if(username=='bob'){
  //     this.userType='merchant';
  //     this.loggedIn=true;
  //   }
  //   else if(username=='sam'){
  //     this.userType='officer';
  //     this.loggedIn=true;
  //   }
  //   else{
  //     this.userType='';
  //     this.loggedIn=false;
  //   }
  // }

  login(email:string,password:string){
    const authData:AuthData={email:email,password:password};
    this.http.post<{token:string,user:any}>('http://localhost:3000/api/user/login',authData)
    .subscribe(response=>{
        const token=response.token;
        this.token=token;
        this.authStatusListener.next(true);
        // Store the user type from the response
        this.userType = response.user.userType;

        // Navigate to the appropriate component based on the user type
        if (this.userType === 'user') {
          this.router.navigate(['']);
        } else if (this.userType === 'merchant') {
          this.router.navigate(['managePro']);
        } else if (this.userType === 'officer') {
          this.router.navigate(['merchantList']);
        } else {
          this.router.navigate(['']);
        }
    });
}
  logout() {
    this.loggedIn = false;
    this.userType = '';
    this.usertypeSubject.next(''); // Notify subscribers that userType has changed to ''
    this.logoutSubject.next(); // Notify subscribers when a user logs out
  }
  isLoggedIn() {
    return this.loggedIn;
  }
  getUserType(){
    return this.userType
  }
  setUserType(usertype: string) {
    this.userType = usertype;
    this.usertypeSubject.next(usertype); // Notify subscribers when usertype changes
  }
  onUsertypeChange() {
    return this.usertypeSubject.asObservable();
  }
  onLogout() {
    return this.logoutSubject.asObservable(); // Observable to notify components on logout
  }
}
