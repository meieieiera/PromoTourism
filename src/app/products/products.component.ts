import { Component, OnInit } from '@angular/core';
import{TourService} from '../services/tour/tour.service'
import { Tour } from '../shared/models/Tour.model';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  tours:Tour[]=[];
  private tourSub: Subscription|undefined;
  userIsAuthenticated=false;
  private authListenerSubs:Subscription;
  userId='';

  constructor(private tourService:TourService, private loginService:LoginService,
    private router:Router){}

  ngOnInit(): void {
    this.tourService.getAll();
    this.tourSub=this.tourService.getToursUpdateListener()
    .subscribe((tours:Tour[])=>{
      this.tours=tours;
  })
    this.authListenerSubs=this.loginService
    .getAuthStatusListener()
    .subscribe(isAuthenticated=>{
        this.userIsAuthenticated=isAuthenticated;
  })
  if(!this.userIsAuthenticated){
    console.log("This user isn't logged in")
  }else{
    console.log("user is logged in")
  }
  this.userId=this.loginService.getUserId();
  console.log(this.userId);
  console.log("user id above")
}
toPurchase(id:number){
    if(!this.loginService.isLoggedIn()){
      this.router.navigateByUrl(`login`);
      console.log("This user not logged in")
    }
    else{
      this.router.navigateByUrl(`purchase/${id}`);
    }
}
}
