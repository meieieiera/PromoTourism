import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { MerchantList } from 'src/app/merchant-list/merchant-list.component';
import { Merchant } from 'src/app/shared/models/merchant.model';
import { HttpClient } from '@angular/common/http';
import { Tour } from 'src/app/shared/models/Tour.model';
import { Document } from 'src/app/shared/models/document.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private merchants:Merchant[]=[];
  private merchantsUpdated = new Subject<Merchant[]>();
  private selectedRowData = new BehaviorSubject<Merchant| null>(null);

  constructor(private http:HttpClient) { }

  setSelectedRowData(data: Merchant| null) {
    this.selectedRowData.next(data);
  }

  getSelectedRowData() {
    return this.selectedRowData.asObservable();
  }
  
  getMerchantById(userid: string): Observable<Merchant> {
    return this.http.get<{ message: string, merchant: Merchant }>('http://localhost:3000/api/merchant/' + userid)
      .pipe(map(response => response.merchant));
  }

  getAllMerchant(){
    this.http.get<{message:string,merchants:any}>('http://localhost:3000/api/merchants')
        .pipe(map((merchantData)=>{
            return merchantData.merchants.map(merchant=>{
                return{
                    id:merchant.id,
                    name:merchant.name,
                    number:merchant.number,
                    description:merchant.description,
                    documents:merchant.document,
                    tours:merchant.tours,
                    userId:merchant.userId,
                    productsSold:merchant.productsSold,
                    revenue:merchant.revenue,
                    _id:merchant._id

                };
            });
        }))
        .subscribe((transformedMerchants)=>{
            this.merchants=transformedMerchants;
            this.merchantsUpdated.next([...this.merchants]);
        })
    }
    getMerchantsUpdateListener(){
      return this.merchantsUpdated.asObservable();
    }

    addMerchant(id: string, name: string, number: string, email: string, desc: string, documents: Document[]){
      console.log("kinda works")
      const regData = {
          id: id, name: name, number: number, description: desc, documents: documents, email: email
      };
      console.log(regData.id + "wow it worked");
      this.http.post('http://localhost:3000/api/merchant/registerMerchant', regData)
      .subscribe(response =>{
        console.log(response),
        error => {
          console.error('Error:', error);
        };
      });
    }
}
