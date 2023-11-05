import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MerchantList } from 'src/app/merchant-list/merchant-list.component';
import { Merchant } from 'src/app/shared/models/merchant.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  
  constructor(private http:HttpClient) { }
  private selectedRowData = new BehaviorSubject<MerchantList | null>(null);

  setSelectedRowData(data: MerchantList | null) {
    this.selectedRowData.next(data);
  }

  getSelectedRowData() {
    return this.selectedRowData.asObservable();
  }
  // //get merchant by id
  // getMerchantById(userid: string): Merchant {
  //   let merchantData: Merchant;
  
  //   this.http.get<{ message: string, merchant: Merchant }>('http://localhost:3000/api/merchant/' + userid)
  //     .subscribe(response => {
  //       const merchant = response.merchant;
  //       merchantData = {
  //         id: merchant.id,
  //         name: merchant.name,
  //         number: merchant.number,
  //         description: merchant.description,
  //         documents: merchant.documents,
  //         tours: merchant.tours,
  //         userId: merchant.userId,
  //         productsSold: merchant.productsSold,
  //         revenue: merchant.revenue,
  //         _id: merchant._id
  //       };
  //       console.log("merchant response below");
  //     });
      
  //   return merchantData;
  // }
  getMerchantById(userid: string): Observable<Merchant> {
    return this.http.get<{ message: string, merchant: Merchant }>('http://localhost:3000/api/merchant/' + userid)
      .pipe(map(response => response.merchant));
  }
}
