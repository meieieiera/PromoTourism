import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterCustomerDialog } from '../register-customer/register-customer.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  usertype=''
  ngOnInit(): void {}
  constructor(public dialog: MatDialog, private loginService:LoginService,
   private router:Router){}

  loginAction(form:NgForm){
    if(form.invalid){
      return;
    }
   // Call the login method and set userType
   this.loginService.login(form.value.email, form.value.password);
    
   // Access the userType after login
   this.usertype = this.loginService.getUserType();
  //  this.loginService.setUserType(this.usertype);
   
  //  if(this.usertype==='customer'){
  //   this.router.navigateByUrl(``);
  //  }
  //  else if(this.usertype==='merchant'){
  //   this.router.navigateByUrl(`managePro`);
  //  }
  //  else if(this.usertype==='officer'){
  //   this.router.navigateByUrl(`approveMer`);
  //  }
  //  else{
  //   this.router.navigateByUrl(`login`);
  //  }
  }
  openDialog() {
    this.dialog.open(RegisterCustomerDialog);
  }
}
