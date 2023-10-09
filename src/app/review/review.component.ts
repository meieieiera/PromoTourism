import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Tour } from '../shared/models/Tour';
import { TourService } from '../services/tour/tour.service';
import { ActivatedRoute, Router } from '@angular/router';
import { detail } from '../shared/models/detail';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Output() detailCreated = new EventEmitter<detail>();
  tour!:Tour;
  constructor(private activatedRoute:ActivatedRoute,
    private tourService: TourService, private router:Router,public dialog: MatDialog){
    activatedRoute.params.subscribe((params)=>{
      if(params['id'])
      this.tour=tourService.getTourById(params['id']);
    })
     
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(message, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  onSubmitPost(form:NgForm){
    if(form.invalid){
      return;
    }
    this.openDialog('0ms', '0ms')
  }
  ngOnInit():void{

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
