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
  private userId='';
  private merchantId='';
  private usertypeSubject = new Subject<string>(); // Create a Subject
  private logoutSubject = new Subject<boolean>(); // Create a Subject for logout notification
  private userIdSubject = new Subject<string>();
  private authStatusListener=new Subject<boolean>();

  private token:string;
  
  constructor(private http:HttpClient, private router:Router){}

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
      return this.authStatusListener.asObservable();
  }

  login(email:string,password:string){
    const authData:AuthData={email:email,password:password};
    this.http.post<{token:string,user:any}>('http://localhost:3000/api/user/login',authData)
    .subscribe(response=>{
        const token=response.token;
        this.token=token;
        
        // Store the user type from the response
        this.userType = response.user.userType;
        this.userId = response.user._id;
        this.usertypeSubject.next(this.userType);
        this.userIdSubject.next(this.userId);
        // Navigate to the appropriate component based on the user type
        if (this.userType === 'customer') {
          this.authStatusListener.next(true);
          this.loggedIn=true;
          this.router.navigate(['']);
        } else if (this.userType === 'merchant') {
          this.authStatusListener.next(true);
          this.loggedIn=true;
          this.router.navigate(['managePro']);
          
        } else if (this.userType === 'officer') {
          this.authStatusListener.next(true);
          this.loggedIn=true;
          this.router.navigate(['approveMer']);
        } else {
          this.authStatusListener.next(false);
          this.router.navigate(['']);

        }
    });
}
  logout() {
    this.loggedIn = false;
    this.userType = '';
    this.usertypeSubject.next(''); // Notify subscribers that userType has changed to ''
    this.logoutSubject.next(true); // Notify subscribers when a user logs out
    this.token=null;
    this.authStatusListener.next(false);
  }
 
  getUserType(){
    return this.userType;
  }
  getUserId(){
    return this.userId;
  }

  setUserType(usertype: string) {
    this.userType = usertype;
    this.usertypeSubject.next(usertype); // Notify subscribers when usertype changes
  }
  setUserId(userid: string) {
    this.userId = userid;
    this.userIdSubject.next(userid); // Notify subscribers when usertype changes
  }
  onUsertypeChange() {
    return this.usertypeSubject.asObservable();
  }
  userIdListener() {
    return this.userIdSubject.asObservable();
  }
  onLogout() {
    return this.logoutSubject.asObservable(); // Observable to notify components on logout
  }
  isLoggedIn() {
    return this.loggedIn;
  }
  registerCustomer(name:string, contact:string,email:string,password:string){
    const data={
      name:name,
      contact:contact,
      email:email,
      password:password
    }
    this.http.post('http://localhost:3000/api/registerCustomer',data)
    .subscribe(response=>{
      console.log(response);
    })
  }
}

