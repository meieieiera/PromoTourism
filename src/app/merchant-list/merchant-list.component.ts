import { Component, OnInit } from '@angular/core';
import {MerchantService } from '../services/merchant/merchant.service';
import { Router } from '@angular/router';
import { Merchant } from '../shared/models/merchant.model';
import { Subscription } from 'rxjs';


export interface MerchantList {
  id:number;
  name:string;
  number:string;
  description:string;
  userId:string;
}


@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css'],
 
})
export class MerchantListComponent implements OnInit {
  merchants:{ id: number; name: string; description: string }[] = [];

  displayedColumns: string[] = ['id', 'name', 'number', 'description'];
  clickedRows = new Set<Merchant>();

  private merchantSub: Subscription|undefined;

  constructor(private merchantService: MerchantService,private router: Router) {}
  onRowClicked(row: Merchant) {
    this.merchantService.setSelectedRowData(row);
    this.router.navigateByUrl(`/report`);
  }

  ngOnInit(): void {
    this.merchantService.getAllMerchant();
    this.merchantSub=this.merchantService.getMerchantsUpdateListener()
    .subscribe((merchants:Merchant[])=>{
      this.merchants=merchants.map((merchant)=>{
        return{
          id:merchant.id,
          name:merchant.name,
          number:merchant.number,
          description:merchant.description,
          userId:merchant.userId
        }
      })
  })
  console.log(this.merchants);
}
}
