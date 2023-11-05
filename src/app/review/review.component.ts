import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Tour } from '../shared/models/Tour.model';
import { TourService } from '../services/tour/tour.service';
import { ActivatedRoute, Router } from '@angular/router';
import { detail } from '../shared/models/detail';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { reviewTour } from '../shared/models/reviewTour.model';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login/login.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  userRating: number; 
  userId='';
  @Output() detailCreated = new EventEmitter<detail>();
  private reviewTourSub: Subscription|undefined;
  rtour!:reviewTour;
  constructor(private activatedRoute:ActivatedRoute,
    private tourService: TourService, 
    private router:Router,
    public dialog: MatDialog,
    private loginService:LoginService){
    activatedRoute.params.subscribe((params)=>{
      if(params['id'])
      this.rtour=tourService.getReviewTourById(params['id']);
    })
     
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(message, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  onSubmitReview(form:NgForm){
    if(form.invalid){
      return;
    }
    this.openDialog('0ms', '0ms')
    this.tourService.updateTour(this.rtour._id, this.userRating,form.value.comment);
    this.tourService.removeReviewTour(this.rtour._id, this.userId)
    this.router.navigateByUrl(`reviewList`);
  }
  ngOnInit():void{
    this.userId=this.loginService.getUserId();
    console.log(this.userId);
    console.log("user id above");
    
  }
}
@Component({
  selector: 'message',
  templateUrl: 'message.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class message {
  constructor(public dialogRef: MatDialogRef<message>) {}
}
