import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../services/merchant/uploadDoc.service';
import { MerchantDocument } from '../shared/models/merchantDocument.model';
import { MerchantService } from '../services/merchant/merchant.service';


@Component({
  selector: 'app-merchant-registration-dialog',
  templateUrl: './merchant-registration-dialog.html',
  styleUrls: ['./merchant-registration.css']
})
export class AppMerchantRegistrationDialog {
  }


@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.html',
  styleUrls: ['./merchant-registration.css']
})
export class MerchantRegForm {
  document: MerchantDocument[] = [{
    name: 'doc1',
    description: 'doc1 description',
  },
  {
    name: 'doc2',
    description: 'doc2 description',
  }]
  constructor(public dialog: MatDialog, public merchantService: MerchantService, public documentService: DocumentService){// Instance:type of service defined
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  onMerchantSignup(form:NgForm){
    if(form.invalid){
      return;
    }

    this.merchantService.merchantRegistration(form.value.name, form.value.contactNum, form.value.email, form.value.description, this.document)
  }

  openDialog2() {
    this.dialog.open(UploadDocDialog);
  }

/*  onAddMerchant(form: NgForm){
    if (form.invalid){
        return;
    }

    this.merchantService.addMerchants(form.value.name, 
      form.value.contactNum ,
      form.value.email, 
      form.value.description, 
      this.documentService.documentArray);
    form.resetForm();


  }*/
}

@Component({
    selector: 'upload-docs-dialog',
    templateUrl: './upload-docs-dialog.html',
    styleUrls: ['./merchant-registration.css']
})
export class UploadDocDialog{
  enteredName='';
    enteredDescription='';

    constructor(public documentService: DocumentService, public dialog: MatDialog){// Instance:type of service defined
    }
  
    openDialog() {
      this.dialog.open(AppMerchantRegistrationDialog);
    }
    
    onAddDoc(form: NgForm){
      if (form.invalid){
          return;
      }
      this.documentService.addDocument(form.value.name, form.value.description);
      form.resetForm();

    }
  
    onFileSelected(event: any) {
      const selectedFile = event.target.files[0];
  
      if (selectedFile) {
        // Here, you can perform actions with the selected file, such as uploading it to a server.
        console.log('Selected File:', selectedFile);
      }
    }
  }



      

@Component({
  selector: 'doc-list',
  templateUrl: './doc-list.html',
  styleUrls: ['./merchant-registration.css']
  })
export class DisplayDocList implements OnInit{
  merchantDocuments: MerchantDocument[] =[];
  constructor(public documentService: DocumentService){// Instance:type of service defined
  }
  
      //function that automatically executes when Angular creates this component. For basic initalisation
      ngOnInit() {
          this.merchantDocuments = this.documentService.getDocument(); //call the service to get posts 
      }

    }

    //connect to service
    //constructor(public postsService: PostsService){}

    /*onAddPost(form: NgForm){
        if (form.invalid){
            return;
        }
        this.postsService.addPost(form.value.title, form.value.content);
        form.resetForm();
    }*/





