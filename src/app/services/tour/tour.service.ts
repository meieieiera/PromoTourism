import { Injectable } from '@angular/core';
import{Tour} from '../../shared/models/Tour.model';
import{HttpClient}from '@angular/common/http';
import{map}from 'rxjs/operators';
import { Subject } from 'rxjs';
import { reviewTour } from 'src/app/shared/models/reviewTour.model';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private tours:Tour[]=[];
  private rTours:reviewTour[]=[];
  private toursUpdated = new Subject<Tour[]>();
  private rToursUpdated = new Subject<reviewTour[]>();
  router: any;

  constructor(private http:HttpClient) { }
  
  getTourById(id:number): Tour{
    return this.tours.find(tour=>tour.id == id)!;
  }
  getReviewTourById(id:number): reviewTour{
    return this.rTours.find(rtour=>rtour.id == id)!;
  }
  getAll(){
    this.http.get<{message:string,tours:any}>('http://localhost:3000/api/tours')
        .pipe(map((tourData)=>{
            return tourData.tours.map(tour=>{
                return{
                    id:tour.id,
                    name:tour.name,
                    price:tour.price,
                    stars:tour.stars,
                    imageUrl:tour.imageUrl,
                    date:tour.date,
                    pax:tour.pax,
                    _id:tour._id
                };
            });
        }))
        .subscribe((transformedPosts)=>{
            this.tours=transformedPosts;
            this.toursUpdated.next([...this.tours]);
        })
    }
    // getAll(){
    //   this.http.get<{ message: string, officers: any }>('http://localhost:3000/api/omTours')
    //   .pipe(
    //     map((officerData) => {
    //       const allTours: Tour[] = [];
    //       officerData.officers.forEach((officer) => {
    //         officer.merchants.forEach((merchant) => {
    //           allTours.push(...merchant.tours);
    //         });
    //       });
    //       return allTours;
    //     })
    //   )
    //   .subscribe((tours) => {
    //     this.tours = tours;
    //     this.toursUpdated.next([...this.tours]);
    //   });
    //   }
  getToursUpdateListener(){
      return this.toursUpdated.asObservable();
    }
  addReviewTour(id:number,name:string,price:number,imageUrl:string,date:string,pax:number){
      const rtour:reviewTour={id:id,name:name,price:price,imageUrl:imageUrl,date:date,pax:pax,_id:''};
      this.http
      .post<{message:string, tourId:number}>('http://localhost:3000/api/rtours',rtour)
      .subscribe((responseData)=>{
          console.log(responseData.message);
          const id=responseData.tourId;
          // rtour.id=id;
          // this.tours.push(rtour);
          // this.toursUpdated.next([...this.tours]);
          // this.router.navigate(['/']);
      });  
  }
  getReviewTours(){
    this.http.get<{message:string,reviewTours:any}>('http://localhost:3000/api/rtours')
        .pipe(map((rTourData)=>{
            return rTourData.reviewTours.map(rtour=>{
                return{
                    id:rtour.id,
                    name:rtour.name,
                    price:rtour.price,
                    // stars:rtour.stars,
                    imageUrl:rtour.imageUrl,
                    date:rtour.date,
                    pax:rtour.pax,
                    _id:rtour._id
                };
            });
        }))
        .subscribe((transformedRTour)=>{
            this.rTours=transformedRTour;
            this.rToursUpdated.next([...this.rTours]);
        })
  }
  getReviewToursUpdateListener(){
    return this.rToursUpdated.asObservable();
  }
  removeReviewTour(rTourId:string){
    this.http.delete<{message:string}>('http://localhost:3000/api/rtour/'+rTourId)
    .subscribe(()=>{
        const updatedRTours = this.rTours.filter(rTour=>rTour._id!==rTourId);
        this.rTours=updatedRTours;
        this.rToursUpdated.next([...this.rTours]);
    });
    
}

  }

  
