import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { MerchantList } from 'src/app/merchant-list/merchant-list.component';
import { Merchant } from 'src/app/shared/models/merchant.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MerchantDocument } from 'src/app/shared/models/merchantDocument.model'
import { UnapprovedMerchant } from 'src/app/shared/models/unapprovedMerchant.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private merchants:Merchant[]=[];
  private merchantsUpdated = new Subject<Merchant[]>();
  private selectedRowData = new BehaviorSubject<Merchant| null>(null);

  constructor(private http:HttpClient) { }

  private documents: MerchantDocument[] = []; 

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
        console.log('merchants from service below')
        console.log(this.merchants);
    }
    getMerchantsUpdateListener(){
      return this.merchantsUpdated.asObservable();
    }

    merchantRegistration(name: string, contactNum: string, email: string, desc: string, document: MerchantDocument[]){
      const regData: UnapprovedMerchant = {
        name: name, contactNum: contactNum, email: email, description: desc, documents: document, status: 'PENDING',
        _id: UnapprovedMerchant._id
      };
      this.http.post('http://localhost:3000/api/', regData)
      .subscribe(response =>{
        console.log(response);
      });
    }
}
