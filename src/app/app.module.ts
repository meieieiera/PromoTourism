import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } 
      from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './products/products.component';
import { ReviewComponent } from './review/review.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenubarComponent } from './menubar/menubar.component';
import { MaterialModule } from './material-module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { ReportComponent } from './report/report.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatDividerModule } from '@angular/material/divider';

//meira
import { AppMerchantRegistrationDialog } from './merchant-registration/merchant-registration.component';
import { PendingApprovalComponent } from './officer/approve-merchants/pending-approval.component';
import { ManageProductsComponent } from './merchant/manage-products/manage-products.component';
import { RegisterCustomerDialog } from './register-customer/register-customer.component';
import { HttpClientModule } from '@angular/common/http';
import { TourService } from './services/tour/tour.service';
import { MerchantRegForm } from './merchant-registration/merchant-registration.component';
import { DisplayDocList } from './merchant-registration/merchant-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ReviewComponent,
    LoginComponent,
    MenubarComponent,
    StarRatingComponent,
    PurchaseComponent,
    PaymentComponent,
    ReviewListComponent,
    MerchantListComponent,
    ReportComponent,
    AppMerchantRegistrationDialog,
    MerchantRegForm,
    DisplayDocList
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MaterialModule,
    MatToolbarModule,
    FormsModule,
    NgbModule,
    NgApexchartsModule,
    PendingApprovalComponent,
    ManageProductsComponent,
    RegisterCustomerDialog,
    HttpClientModule,
    MatDividerModule
  ],
  providers: [TourService],
  bootstrap: [AppComponent]
})
export class AppModule { }
