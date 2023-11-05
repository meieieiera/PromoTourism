import { Component, OnInit } from '@angular/core';
import { Tour } from '../shared/models/Tour.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../services/tour/tour.service';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit{
  
  tour!:Tour;
  private userIdSubs:Subscription;
  userId='';
  
  constructor(private activatedRoute:ActivatedRoute,
    private tourService: TourService, 
    private router:Router, 
    public dialog: MatDialog, 
    private loginService:LoginService){
    activatedRoute.params.subscribe((params)=>{
      if(params['id'])
      this.tour=tourService.getTourById(params['id']);
    })
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(receipt, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  onPayment(form:NgForm){
    if(form.invalid){
      return;
    }
    this.openDialog('0ms', '0ms')
    // this.tourService.addReviewTour(this.tour.id,this.tour.name,this.tour.price,this.tour.imageUrl,this.tour.date,this.tour.pax);
    this.tourService.addReviewTour(this.tour._id,this.userId);
    this.tourService.updateAnalysis(this.tour._id);
  }

  ngOnInit():void{
    // this.userIdSubs=this.loginService
    //     .userIdListener()
    //     .subscribe((userid: string)=>{
    //         this.userId=userid;
    // });
    this.userId=this.loginService.getUserId();
    console.log(this.userId);
    console.log("user id above");
  }

}
@Component({
  selector: 'recepit',
  templateUrl: 'receipt.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class receipt {
  constructor(public dialogRef: MatDialogRef<receipt>) {}
}

