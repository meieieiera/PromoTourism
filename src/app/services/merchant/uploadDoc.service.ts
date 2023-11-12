import {MerchantDocument} from '../../shared/models/merchantDocument.model'; //get post model
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class DocumentService { //create a service class
    private documents: MerchantDocument[] = []; // set type to Post array(model)

    //to retrieve the post 
    getDocument(){
        return this.documents; //creating new array by copying the old array
    }

    // to add a post 
    addDocument(name: string, description: string){
        const document: MerchantDocument = {name: name, description: description}; // varialbe storing values of post
        this.documents.push(document); // push the new post into posts array
    }

    // Function that returns an array of Document
    getDocumentArray(): Document[] {
    // Implementation to fetch and return documents
    return [];
  }
  
  // Calling the function to get the array of Document
    documentArray: Document[] = this.getDocumentArray();
}