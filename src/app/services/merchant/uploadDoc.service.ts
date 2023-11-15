import {Document} from '../../shared/models/document.model'; //get post model
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class DocumentService { //create a service class
    private documents: Document[] = []; // set type to Post array(model)

    //to retrieve the post 
    getDocument(){
        return this.documents; //creating new array by copying the old array
    }

    // to add a post 
    addDocument(name: string, description: string, file: File){
        const document: Document = {name: name, description: description, file: file}; // varialbe storing values of post
        this.documents.push(document); // push the new doc into doc array
    }

    // Function that returns an array of Document
    getDocumentArray(): Document[] {
        return this.documents.slice();
      }
    /*getDocumentArray(): FormData {
        const formData = new FormData();
        for (let i = 0; i < this.documents.length; i++) {
            const document = this.documents[i];
            
            // Append each document's data to the FormData
            formData.append(`documents[${i}][title]`, document.name);
            formData.append(`documents[${i}][description]`, document.description);
            formData.append(`documents[${i}][file]`, document.formData.get('file') || '');
          }
        return formData; // return a copy of the array
      }*/
      
  
  // Calling the function to get the array of Document
    //documentArray: Document[] = this.getDocumentArray();

    resetDocumentArray(){
        this.documents = [];
    }
}