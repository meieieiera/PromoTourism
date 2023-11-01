import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn=false;
  private userType='';
  private usertypeSubject = new Subject<string>(); // Create a Subject
  private logoutSubject = new Subject<void>(); // Create a Subject for logout notification

  constructor() { }

  login(username:string,password:string){
    if (username=='alicia'){
      this.userType='user';
      this.loggedIn=true;
    }
    else if(username=='bob'){
      this.userType='merchant';
      this.loggedIn=true;
    }
    else if(username=='sam'){
      this.userType='officer';
      this.loggedIn=true;
    }
    else{
      this.userType='';
      this.loggedIn=false;
    }
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
