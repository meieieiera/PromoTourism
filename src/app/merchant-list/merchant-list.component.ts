import { Component } from '@angular/core';
import {MerchantService } from '../services/merchant/merchant.service';
import { Router } from '@angular/router';


export interface MerchantList {
  name: string;
  id: string;
  email: string;
  contact: string;
}

const MERCHANT_DATA: MerchantList[] = [
  {id:'M0001', name: 'Alex', email: 'alex@gmail.com', contact: '016-2223333'},
  {id:'M0002', name: 'Amy', email: 'amy@gmail.com', contact: '016-3334444'},
  {id:'M0003', name: 'Jenny', email: 'jenny@gmail.com', contact: '016-5556666'},
  {id:'M0004', name: 'Chase', email: 'chase@gmail.com', contact: '016-6667777'},
  {id:'M0005', name: 'Kim', email: 'kim@gmail.com', contact: '016-6668888'},
  {id:'M0006', name: 'Tom', email: 'tom@gmail.com', contact: '016-7778888'},
  {id:'M0007', name: 'Ben', email: 'ben@gmail.com', contact: '016-8889999'},
];

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css'],
 
})
export class MerchantListComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'contact'];
  dataSource = MERCHANT_DATA;
  clickedRows = new Set<MerchantList>();

  constructor(private merchantService: MerchantService,private router: Router) {}
  onRowClicked(row: MerchantList) {
    this.merchantService.setSelectedRowData(row);
    this.router.navigateByUrl('/report');
  }

}
