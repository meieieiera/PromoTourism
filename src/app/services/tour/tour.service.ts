import { Injectable } from '@angular/core';
import{Tour} from '../../shared/models/Tour.model';
import{HttpClient}from '@angular/common/http';
import{map, tap}from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { reviewTour } from 'src/app/shared/models/reviewTour.model';
import { Merchant } from 'src/app/shared/models/merchant.model';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private tours:Tour[]=[];
  private rTours:reviewTour[]=[];
  private toursUpdated = new Subject<Tour[]>();
  private toursByMIdUpdate = new Subject<Tour[]>();
  private rToursUpdated = new Subject<reviewTour[]>();
  private merchant:Merchant;
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
                    description:tour.description,
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
    
  getToursUpdateListener(){
      return this.toursUpdated.asObservable();
    }
  
  addReviewTour(_id:string,customerId:string){
    const data = {
      tourId:_id,
      customerId: customerId
  };
    this.http.post<{message:string}>('http://localhost:3000/api/rtours',data)
    .subscribe((responseData)=>{
        console.log(responseData.message);
    });  
}
  getReviewTours(customerId:string){
    const custId=customerId;
    this.http.get<{message:string,reviewTours:any}>('http://localhost:3000/api/rtours/'+custId)
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
  removeReviewTour(rTourId:string, custUserId:string){
    // const tourId=rTourId;
    // const customerId=custId;
    const data = {
      tourId:rTourId,
      customerUserId:custUserId
  };
    
    this.http.put<{message:string}>('http://localhost:3000/api/removeRtour',data)
    .subscribe(()=>{
        // const updatedRTours = this.rTours.filter(rTour=>rTour._id!==rTourId);
        // this.rTours=updatedRTours;
        // this.rToursUpdated.next([...this.rTours]);
    });
    
}

  updateTour(rtourId:string,rating:number,comment:string){
    const data = {
      tourId:rtourId,
      rating:rating,
      comment:comment
  };
    this.http.put<{message:string}>('http://localhost:3000/api/updateTour',data)
    .subscribe(response=>{
      console.log(response);
  });
  }
  
  updateAnalysis(tourid:string){
    const data = {
      tourId:tourid,
  };

    this.http.put<{message:string}>('http://localhost:3000/api/updateAnalysis',data)
    .subscribe(response=>{
      console.log(response);
  });
  }

// Modify the getAll method to accept a merchantId parameter
getTourByMerchantId(merchantId: string): Observable<Tour[]>{
// Modify the getAll method to accept a merchantId parameter
  // Adjust the URL to include the merchantId
  const url = `http://localhost:3000/api/tours?merchantId=${merchantId}`;

  return this.http.get<{ message: string, tours: any }>(url)
    .pipe(
      map((tourData) => {
        return tourData.tours.map(tour => {
          return {
            id: tour.id,
            name: tour.name,
            description: tour.description,
            price: tour.price,
            stars: tour.stars,
            imageUrl: tour.imageUrl,
            date: tour.date,
            pax: tour.pax,
            _id: tour._id
          };
        });
      }),
      tap(transformedPosts => {
        this.tours = transformedPosts;
        this.toursByMIdUpdate.next([...this.tours]);
      })
    );
}

getToursByMIdUpdateListener(){
  return this.toursByMIdUpdate.asObservable();
}

deleteTour(tourId: number){
  this.http.delete('http://localhost:3000/api/deleteTour/' + tourId)
  .subscribe(()=>{
    console.log('Deleted Tour');
    const updatedTours = this.tours.filter(tour => tour.id !== tourId);
    this.tours = updatedTours;
    this.toursUpdated.next([...this.tours]);
  })
}

updateTourProduct(tourData: any){
  const url = 'http://localhost:3000/api/updateTourProduct';
  return this.http.put(url, tourData).subscribe(response=>{
    console.log(response);
});
}



addTour(name: string, quantity: number, price: number, description: string, formData: FormData){
  console.log("kinda works")
        const regData: any = {
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          image: formData
        };
        console.log(regData.contactNum + "wow it worked");
        this.http.post('http://localhost:3000/api/addTour', regData)
        .subscribe(response =>{
          console.log(response),
          error => {
            console.error('Error:', error);
          };
        });
}



  }
  // addReviewTour(id:number,name:string,price:number,imageUrl:string,date:string,pax:number){
  //     const rtour:reviewTour={id:id,name:name,price:price,imageUrl:imageUrl,date:date,pax:pax,_id:''};
  //     this.http
  //     .post<{message:string, tourId:number}>('http://localhost:3000/api/rtours',rtour)
  //     .subscribe((responseData)=>{
  //         console.log(responseData.message);
  //         const id=responseData.tourId;
  //         // rtour.id=id;
  //         // this.tours.push(rtour);
  //         // this.toursUpdated.next([...this.tours]);
  //         // this.router.navigate(['/']);
  //     });  
  // }

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

  
