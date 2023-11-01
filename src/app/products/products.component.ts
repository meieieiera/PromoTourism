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

  constructor(private tourService:TourService, private loginService:LoginService,
    private router:Router){}

  ngOnInit(): void {
    this.tourService.getAll();
    this.tourSub=this.tourService.getToursUpdateListener()
    .subscribe((tours:Tour[])=>{
      this.tours=tours;
  })
    this.loginService.onUsertypeChange().subscribe((usertype) => {
      // Handle user type changes
    });
}
toPurchase(id:number){
    if(!this.loginService.isLoggedIn()){
      this.router.navigateByUrl(`login`);
    }
    else{
      this.router.navigateByUrl(`purchase/${id}`);
    }
}
}
