import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgForm} from '@angular/forms';
import { DocumentService } from '../services/merchant/uploadDoc.service';
import { Document } from '../shared/models/document.model';
import { forwardRef } from "@angular/core";
import { UnapprovedMerchant } from '../shared/models/unapprovedMerchant.model';
import { UnapprovedMerchantService } from '../services/merchant/unapprovedMerchant.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import {FormGroup} from "@angular/forms";  

@Component({
  selector: 'app-merchant-registration-dialog',
  templateUrl: './merchant-registration-dialog.html',
  styleUrls: ['./merchant-registration.css'],
  standalone: true,
  imports: [CommonModule, 
    MatButtonModule, 
    MatDialogModule, 
    FormsModule,   
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    ReactiveFormsModule, 
    NgIf,
    MatExpansionModule,
    forwardRef(() => MerchantRegForm)]

})
export class AppMerchantRegistrationDialog {

    
  
  }


@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.html',
  styleUrls: ['./merchant-registration.css'],
  standalone: true,
  imports: [CommonModule, 
    MatButtonModule, 
    MatDialogModule, 
    FormsModule,   
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    ReactiveFormsModule, 
    NgIf,
    MatExpansionModule,
    MatDividerModule]

})
export class MerchantRegForm {
  constructor(public dialog: MatDialog, public merchantService: UnapprovedMerchantService, public documentService: DocumentService){// Instance:type of service defined
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  onMerchantSignup(form:NgForm){
    const mDoc: Document[] = this.documentService.getDocumentArray();

    if(form.invalid){
      return;
    }

    this.merchantService.merchantRegistration(form.value.name, form.value.contactNum, form.value.email, form.value.description, mDoc);
    console.log(form.value.name + "\n" + form.value.contactNum + "\n" + form.value.email + "\n" +form.value.description + "\n" + mDoc.length);
    this.documentService.resetDocumentArray();
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
    styleUrls: ['./merchant-registration.css'],
    standalone: true,
    imports: [CommonModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        NgIf,
        MatExpansionModule, 
        forwardRef(() => DisplayDocList)
      ]
})
export class UploadDocDialog{
  title='';
    description='';
    selectedFile: File | null = null;
    


    constructor(public documentService: DocumentService, public dialog: MatDialog){// Instance:type of service defined
    }
  
    openDialog() {
      this.dialog.open(AppMerchantRegistrationDialog);
    }

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        // Here, you can perform actions with the selected file, such as uploading it to a server.
        console.log('Selected File:', this.selectedFile);
      }
    }

    onAddDoc(form: NgForm){
      const formData = new FormData;
      formData.append('file', this.selectedFile);

      if (form.invalid){
          return;
      }
      this.documentService.addDocument(form.value.name, form.value.description, formData);
      form.resetForm();
    }




  
/*    onFileSelected(event: Event) {
      const selectedFile = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({document: file});  
      this.form.get('document').updateValueAndValidity();  
      const reader = new FileReader();  
      reader.onload = ()=>{  
        this.Pickedimage = reader.result as string;  
      };  
      reader.readAsDataURL(file);  
  
      if (selectedFile) {
        // Here, you can perform actions with the selected file, such as uploading it to a server.
        console.log('Selected File:', selectedFile);
      }
    }*/
  }



      

@Component({
  selector: 'doc-list',
  templateUrl: './doc-list.html',
  styleUrls: ['./merchant-registration.css'],
  standalone: true,
  imports: 
  [CommonModule, 
  MatButtonModule, 
  MatDialogModule, 
  FormsModule,   
  MatFormFieldModule, 
  MatInputModule, 
  MatIconModule, 
  ReactiveFormsModule, 
  NgIf,
  MatExpansionModule
  ],
  
  })
export class DisplayDocList implements OnInit{
  documents: Document[] =[];
  constructor(public documentService: DocumentService){// Instance:type of service defined
  }
  
      //function that automatically executes when Angular creates this component. For basic initalisation
      ngOnInit() {
          this.documents = this.documentService.getDocument(); //call the service to get posts 
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





