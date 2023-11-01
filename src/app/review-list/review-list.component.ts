import { Component } from '@angular/core';
import{TourService} from '../services/tour/tour.service'
import { Tour } from '../shared/models/Tour.model';
import { reviewTour } from '../shared/models/reviewTour.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent {
  rtours:reviewTour[]=[];
  private rTourSub: Subscription|undefined;

  constructor(private tourService:TourService){}

  ngOnInit(): void {
      this.tourService.getReviewTours();
      this.rTourSub=this.tourService.getReviewToursUpdateListener()
      .subscribe((rtours:reviewTour[])=>{
        this.rtours=rtours;
  })
  }
}
