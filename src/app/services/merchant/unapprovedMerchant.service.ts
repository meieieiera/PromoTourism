import { UnapprovedMerchant } from 'src/app/shared/models/unapprovedMerchant.model';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Document } from 'src/app/shared/models/document.model';

@Injectable({providedIn: 'root'})

export class UnapprovedMerchantService { //create a service class
    private merchants: UnapprovedMerchant[] = []; // set type to Post array(model)
    constructor(private http: HttpClient) { }

    //to retrieve the post 
    getMerchant() {
        return this.http.get<UnapprovedMerchant[]>('http://localhost:3000/api/');
      }

    // to add a post 
    /*
    addMerchants(name: string, contactNum: string, email: string, description: string, documents: Document[]){
        const merchant: UnapprovedMerchant = {
            id: null, name: name, contactNum: contactNum, email: email, description: description, documents: documents,
            status: 'pending',
            _id: ''
        }; // varialbe storing values of post
        this.merchants.push(merchant); // push the new post into posts array
    }*/

    merchantRegistration(name: string, contactNum: string, email: string, desc: string, document: Document[]){
        const regData: UnapprovedMerchant = {
            name: name, contactNum: contactNum, email: email, description: desc, documents: document, status: 'PENDING',
            id: UnapprovedMerchant._id
        };
        this.http.post('http://localhost:3000/api/unapprovedMerchant/register', regData)
        .subscribe(response =>{
          console.log(response);
        });
      }
}