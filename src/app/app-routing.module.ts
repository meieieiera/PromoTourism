import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { ReviewComponent } from './review/review.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PaymentComponent } from './payment/payment.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { ReportComponent } from './report/report.component';
import { MenubarComponent } from './menubar/menubar.component';
//meira
import { AppMerchantRegistrationDialog } from './merchant-registration/merchant-registration.component';
import { PendingApprovalComponent } from './officer/approve-merchants/pending-approval.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { RegisterCustomerDialog } from './register-customer/register-customer.component';

const routes: Routes=[
  {path:'',component:ProductsComponent},
  {path:'login',component:LoginComponent},
  {path:'review/:id',component:ReviewComponent},
  {path:'purchase/:id', component:PurchaseComponent},
  // {path:'payment/:id', component:PaymentComponent},
  {path:'payment', component:PaymentComponent},
  {path:'reviewList', component:ReviewListComponent},
  {path:'merchantList', component:MerchantListComponent},
  {path:'report',component:ReportComponent},
  {path:'menubar',component:MenubarComponent},
  {path: 'merchantReg', component: AppMerchantRegistrationDialog},
  {path: 'approveMer', component: PendingApprovalComponent},
  {path: 'managePro', component: ManageProductsComponent },
  {path: 'registerCus', component: RegisterCustomerDialog}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
