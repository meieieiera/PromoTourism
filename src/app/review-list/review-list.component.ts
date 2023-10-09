import { Component } from '@angular/core';
import{TourService} from '../services/tour/tour.service'
import { Tour } from '../shared/models/Tour';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent {
  tours:Tour[]=[];

  constructor(private tourService:TourService){}

  ngOnInit(): void {
      this.tours=this.tourService.getAll();
  }
}
