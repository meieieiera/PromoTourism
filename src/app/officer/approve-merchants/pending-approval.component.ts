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

export interface MerchantInformation {
  contactNum: string;
  email: string;
  description: string;
}

const ELEMENT_DATA: MerchantInformation[] = [
  {contactNum: '+6012-34567890', email: 'customer@abcindustries.com', description: 'We are abc industies leading in sales of package trips to Thailand and Singapore'}
];

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
  
  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer) {}
  
    panelOpenState = false;

    displayedColumns: string[] = ['contactNum', 'email', 'description'];
    dataSource = ELEMENT_DATA;

    regCert;


    ngOnInit(){
      const data = 'some text';
      const blob = new Blob([data], {
        type: 'application/octet-stream'
      });
      this.regCert = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    }

    openDialog() {
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
