import { Component,OnInit,EventEmitter,Output  } from '@angular/core';
import { Tour } from '../shared/models/Tour.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TourService } from '../services/tour/tour.service';
import { NgForm } from '@angular/forms';
import { detail } from '../shared/models/detail';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
 
  @Output() detailCreated = new EventEmitter<detail>();
  
  tour!:Tour;
  constructor(private activatedRoute:ActivatedRoute,
    private tourService: TourService, private router:Router){
    activatedRoute.params.subscribe((params)=>{
      if(params['id'])
      this.tour=tourService.getTourById(params['id']);
    })
     
  }

  // toPayment(form:NgForm){
  //   if(form.invalid){
  //     return;
  //   }
  //   const Detail:detail={
  //     fname:form.value.fname,
  //     lname:form.value.lname,
  //     phone:form.value.phone,
  //     email:form.value.email
  //   };
  //   // this.detailCreated.emit(Detail);
  //   this.router.navigateByUrl(`payment/${this.tour.id}`);
  // }

  toPayment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const detail: detail = {
      fname: form.value.fname,
      lname: form.value.lname,
      phone: form.value.phone,
      email: form.value.email
    };
  
    // Create an object containing the data you want to pass
    const navigationExtras: NavigationExtras = {
      queryParams: {
        tourId: this.tour.id,
        fname: detail.fname,
        lname: detail.lname,
        phone: detail.phone,
        email: detail.email
      }
    };
  
    // Use router to navigate to the payment component with the query parameters
    this.router.navigate([`payment`], navigationExtras);
  }

  ngOnInit():void{

  }
  
  
}






