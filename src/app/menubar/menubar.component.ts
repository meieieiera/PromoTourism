import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AppMerchantRegistrationDialog } from '../merchant/merchant-registration/merchant-registration.component';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})

export class MenubarComponent implements OnInit {
userType='';
constructor(public dialog: MatDialog, private loginService: LoginService,private router:Router) {} // Inject the UserService

  openDialog() {
    this.dialog.open(AppMerchantRegistrationDialog);
  }

  ngOnInit(): void {
    this.loginService.onUsertypeChange().subscribe((usertype) => {
      this.userType = usertype;
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
  if(this.userType=='user'){
    this.router.navigateByUrl(`reviewList`);
  }
  else{
    this.router.navigateByUrl(`login`);
  }
}
}
