import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, map } from 'rxjs';
import { UnapprovedMerchantService } from 'src/app/services/merchant/unapprovedMerchant.service';
import { UnapprovedMerchant } from 'src/app/shared/models/unapprovedMerchant.model';
import { MerchantService } from 'src/app/services/merchant/merchant.service';
import { Document } from 'src/app/shared/models/document.model';

export interface MerchantInformation {
  contactNum: string;
  email: string;
  description: string;
}

/*const ELEMENT_DATA: MerchantInformation[] = [
  {contactNum: '+6012-34567890', email: 'customer@abcindustries.com', description: 'We are abc industies leading in sales of package trips to Thailand and Singapore'}
];*/

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'pending-approval-component',
  templateUrl: './pending-approval.component.html',
  styleUrls: ['./pending-approval.component.css'],
  standalone: true,
  imports: [CommonModule, 
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatTableModule
  ]

})

export class PendingApprovalComponent {

  
  constructor(
    public dialog: MatDialog,
    private sanitizer: DomSanitizer, 
    private unapprovedMerchantService: UnapprovedMerchantService, 
    private merchantService: MerchantService
    ) {}
  
    panelOpenState = false;

    displayedColumns: string[] = ['contactNum', 'email', 'description'];
    unapprovedMerchants: UnapprovedMerchant[] = [];
    private merchantSub: Subscription|undefined;

    regCert;


    ngOnInit(){
      this.merchantSub = this.unapprovedMerchantService.getAll()
      .subscribe(
        (merchants: UnapprovedMerchant[]) => {
          this.unapprovedMerchants = merchants;
        },
        (error) => {
          console.error('Error fetching merchants:', error);
        }
      );
  
    // Subscribe to updates
    this.unapprovedMerchantService.getMerchantsUpdateListener()
      .subscribe(
        (merchants: UnapprovedMerchant[]) => {
          this.unapprovedMerchants = merchants;
        },
        (error) => {
          console.error('Error receiving updates:', error);
        }
      );

      const data = 'some text';
      const blob = new Blob([data], {
        type: 'application/octet-stream'
      });
      this.regCert = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    }

    ngOnDestroy() {
      // Unsubscribe to prevent memory leaks
      if (this.merchantSub) {
        this.merchantSub.unsubscribe();
      }
    }

  onDeleteMerchant(merchantId: string){
    this.unapprovedMerchantService.deleteMerchant(merchantId);
  }

  onApproveMerchant(id: string, name: string, num: string, email: string, desc: string, documents: Document[]) {
    this.merchantService.addMerchant(id, name, num, email, desc, documents);
    this.unapprovedMerchantService.deleteMerchant(id);
    this.dialog.open(SaveDialog);
  }
}

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'save-dialog',
  templateUrl: './save-dialog.html',
  styleUrls: ['./pending-approval.component.css'],
  standalone: true,
  imports: [CommonModule, 
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatTableModule
  ]

})

export class SaveDialog {


}
