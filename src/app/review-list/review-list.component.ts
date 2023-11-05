import { Component } from '@angular/core';
import{TourService} from '../services/tour/tour.service'
import { Tour } from '../shared/models/Tour.model';
import { reviewTour } from '../shared/models/reviewTour.model';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent {
  rtours:reviewTour[]=[];
  userId='';
  private rTourSub: Subscription|undefined;

  constructor(private tourService:TourService, private loginService:LoginService){}

  ngOnInit(): void {
      this.userId=this.loginService.getUserId();
      this.tourService.getReviewTours(this.userId);
      this.rTourSub=this.tourService.getReviewToursUpdateListener()
      .subscribe((rtours:reviewTour[])=>{
        this.rtours=rtours;
  })
  }
}
