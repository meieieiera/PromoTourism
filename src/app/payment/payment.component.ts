import { Component, OnInit,Inject  } from '@angular/core';
import { Tour } from '../shared/models/Tour.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../services/tour/tour.service';
import {MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login/login.service';
import * as pdfMake from 'pdfmake/build/pdfMake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import { Margins } from 'pdfmake/interfaces';
// import { Alignment } from 'pdfmake/interfaces';
// import { Decoration } from 'pdfmake/interfaces';

(pdfMake as any).vfs=pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit{

  tour!:Tour;
  private userIdSubs:Subscription;
  userId='';
  fname='';
  lname='';
  phone ='';
  email ='';

  
  constructor(private activatedRoute:ActivatedRoute,
    private tourService: TourService, 
    private router:Router, 
    public dialog: MatDialog, 
    private loginService:LoginService){
    // activatedRoute.params.subscribe((params)=>{
    //   if(params['id'])
    //   this.tour=tourService.getTourById(params['id']);
    // })

    this.activatedRoute.queryParams.subscribe((params) => {
      // const tourId = params['tourId'];
      this.tour=tourService.getTourById(params['tourId']);
      this.fname = params['fname'];
      this.lname = params['lname'];
      this.phone = params['phone'];
      this.email = params['email'];
  });
}
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const data = {
      tourName:this.tour.name,
      tourDate:this.tour.date,
      tourPax:this.tour.pax,
      tourPrice:this.tour.price,
      userId: this.userId,
      fname: this.fname,
      lname: this.lname,
      phone: this.phone,
      email: this.email
    };

    this.dialog.open(receipt, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:data,
    });
  }
  onPayment(form:NgForm){
    if(form.invalid){
      return;
    }
    this.openDialog('0ms', '0ms')
    this.tourService.addReviewTour(this.tour._id,this.userId);
    this.tourService.updateAnalysis(this.tour._id);
  }

  ngOnInit():void{
    // this.userIdSubs=this.loginService
    //     .userIdListener()
    //     .subscribe((userid: string)=>{
    //         this.userId=userid;
    // });
    this.userId=this.loginService.getUserId();
    console.log(this.userId);
    console.log("user id above");
  }

}
@Component({
  selector: 'recepit',
  templateUrl: 'receipt.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class receipt {
  mvPDF:any;
  constructor(public dialogRef: MatDialogRef<receipt>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private router:Router,) {
    }
    generateReceipt(){
      this.generatePDF();
      this.router.navigateByUrl(``);
    }

    generatePDF() {
      let docDefinition = {
        content: [
          {  
            columns: [  
                [  
                    {  
                      text: 'Receipt',
                      style: 'header'  
                    },
                ],  
                [  
                    {  
                        text: `Date: ${new Date().toLocaleString()}`,  
                        alignment: 'right', //as Alignment,
                        bold: false 
                    },
                ],
            ] , 
          },
          {  
            columns: [  
                [  
                    {  
                      text: this.data.tourName,
                      style:'subheader',
                    },
                ],  
                [  
                    {  
                      text: 'Tour date:  '+ this.data.tourDate, 
                      style:'normal', 
                      alignment: 'right' ,//as Alignment,
                    },
                ],
            ] , 
          },
  
          {
            text: 'Pax:  '+this.data.tourPax,
            style:'normal',
          },
          {
            text: 'Price:  RM '+this.data.tourPrice,
            style:'normal',
          },
          {
            text: 'Buyer:  '+this.data.fname+' '+this.data.lname,
            style:'normal',
          },
          {
            text: 'Phone:  '+this.data.phone,
            style:'normal',
          },
          {
            text: 'Email:  '+this.data.email,
            style:'normal',
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 16,
            margin: [0, 10, 0, 5],// as Margins,
            bold: true,
          },
          violationCategory: {
            fontSize: 13,
            bold: true,
            margin: [0, 10, 0, 5],// as Margins,
            decoration: 'underline',// as Decoration,
          },
          normal: {
            margin: [0, 5, 0, 5],// as Margins,
          },
          normal2: {
            margin: [0, 2, 0, 2],// as Margins,
          },
        },
      };
      this.mvPDF=pdfMake.createPdf(docDefinition);
      pdfMake.createPdf(docDefinition).open();//open pdf to view
      // // Send the generated PDF as a Blob
      // return new Promise((resolve, reject) => {
      //   this.mvPDF.getBlob((pdfBlob: Blob) => {
      //     resolve(pdfBlob);
      //   });
      // });
      
    }

}


