import {UnapprovedMerchant} from '../../shared/models/unapprovedMerchant.model'; //get post model
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class UnapprovedMerchantService { //create a service class
    private merchants: UnapprovedMerchant[] = []; // set type to Post array(model)

    //to retrieve the post 
    getMerchant(){
        return this.merchants; //creating new array by copying the old array
    }

    // to add a post 
    addMerchants(name: string, contactNum: string, email: string, description: string, documents: Document[]){
        const merchant: UnapprovedMerchant = {name: name, contactNum: contactNum, email: email, description: description, documents: documents}; // varialbe storing values of post
        this.merchants.push(merchant); // push the new post into posts array
    }
}