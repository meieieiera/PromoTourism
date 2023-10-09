import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MerchantList } from 'src/app/merchant-list/merchant-list.component';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  
  constructor() { }
  private selectedRowData = new BehaviorSubject<MerchantList | null>(null);

  setSelectedRowData(data: MerchantList | null) {
    this.selectedRowData.next(data);
  }

  getSelectedRowData() {
    return this.selectedRowData.asObservable();
  }
}
