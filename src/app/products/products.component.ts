import { Component, OnInit } from '@angular/core';
import{TourService} from '../services/tour/tour.service'
import { Tour } from '../shared/models/Tour';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  tours:Tour[]=[];

  constructor(private tourService:TourService, private loginService:LoginService,
    private router:Router){}

  ngOnInit(): void {
      this.tours=this.tourService.getAll();
      this.loginService.onUsertypeChange().subscribe((usertype) => {
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
