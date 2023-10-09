import { Component, OnInit } from '@angular/core';
import { Tour } from '../shared/models/Tour';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../services/tour/tour.service';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit{
  
  tour!:Tour;
  constructor(private activatedRoute:ActivatedRoute,
    private tourService: TourService, private router:Router, public dialog: MatDialog){
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
  }

  ngOnInit():void{}

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

