import { UnapprovedMerchant } from 'src/app/shared/models/unapprovedMerchant.model';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Document } from 'src/app/shared/models/document.model';
import { Observable, Subject, map, tap } from 'rxjs';
import { Merchant } from 'src/app/shared/models/merchant.model';

@Injectable({providedIn: 'root'})

export class UnapprovedMerchantService { //create a service class
    private merchants: UnapprovedMerchant[] = []; 
    private merchantsUpdated = new Subject<UnapprovedMerchant[]>();
    private apiUrl = 'http://localhost:3000/api/unapprovedMerchant';
    constructor(private http: HttpClient) { }

    //to retrieve the post 
    /*getMerchant() {
        return this.http.get<UnapprovedMerchant[]>('http://localhost:3000/api/unapprovedMerchant');
      }*/

      getAll(): Observable<UnapprovedMerchant[]> {
        return this.http.get<{ message: string; unapprovedMerchant: UnapprovedMerchant[] }>('http://localhost:3000/api/unapprovedMerchant')
          .pipe(
            map((unapprovedMerchantData) => {
              return unapprovedMerchantData.unapprovedMerchant.map((merchant) => {
                return {
                  id: merchant.id,
                  name: merchant.name,
                  contactNum: merchant.contactNum,
                  email: merchant.email,
                  description: merchant.description,
                  documents: merchant.documents,
                  status: merchant.status
                };
              });
            }),
            tap(transformedMerchants => {
              this.merchants = transformedMerchants;
              this.merchantsUpdated.next([...this.merchants]);
            })
          );
      }
      getMerchantsUpdateListener(){
        return this.merchantsUpdated.asObservable();
      }


      deleteMerchant(merchantId: string){
        this.http.delete('http://localhost:3000/api/unapprovedMerchant/' + merchantId)
        .subscribe(()=>{
          console.log('Deleted Merchant');
          const updatedMerchants = this.merchants.filter(merchant => merchant.id !== merchantId);
          this.merchants = updatedMerchants;
          this.merchantsUpdated.next([...this.merchants]);
        })
      }


    merchantRegistration(name: string, contactNum: string, email: string, desc: string, document: Document[]){
    
        console.log("kinda works")
        const regData: UnapprovedMerchant = {
            name: name, contactNum: contactNum, email: email, description: desc, documents: document, status: 'PENDING',
            id: ''
        };
        console.log(regData.contactNum + "wow it worked");
        this.http.post('http://localhost:3000/api/unapprovedMerchant', regData)
        .subscribe(response =>{
          console.log(response),
          error => {
            console.error('Error:', error);
          };
        });
      }
}