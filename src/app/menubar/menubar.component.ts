import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AppMerchantRegistrationDialog } from '../merchant/merchant-registration/merchant-registration.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})

export class MenubarComponent implements OnInit {
  private userTypeSubs:Subscription;
  userType='';
  userIsAuthenticated = false;
  private authListenerSubs:Subscription;
  constructor(public dialog: MatDialog, private loginService: LoginService,private router:Router) {} // Inject the UserService

    openDialog() {
      this.dialog.open(AppMerchantRegistrationDialog);
  }

  ngOnInit(): void {
    this.authListenerSubs=this.loginService
    .getAuthStatusListener()
    .subscribe(isAuthenticated=>{
        this.userIsAuthenticated=isAuthenticated;
  })
    this.userTypeSubs=this.loginService
        .onUsertypeChange()
        .subscribe(userType=>{
            this.userType=userType;
    });
    // Handle logout
    this.loginService.onLogout().subscribe(() => {
      this.userType = ''; // Reset userType when the user logs out
    });
  }
logout(){
  this.loginService.logout();
  this.router.navigateByUrl(``);
}
toReport(){
  if(this.userType=='merchant'){
    this.router.navigateByUrl(`report`);
  }
  else{
    this.router.navigateByUrl(`merchantList`);
  }
}
toReview(){
  if(this.userType=='customer'){
    this.router.navigateByUrl(`reviewList`);
  }
  else{
    this.router.navigateByUrl(`login`);
  }
}
}
