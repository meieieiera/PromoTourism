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
import { forwardRef } from "@angular/core";
import { MatDividerModule } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { LoginService } from '../services/login/login.service';


@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer-dialog.html',
  styleUrls: ['./register-customer.component.css'],
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
export class RegisterCustomerDialog {
  hide = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private loginService:LoginService){}

  onRegister(form:NgForm){
    if(form.invalid){
      return;
    }
    this.loginService.registerCustomer(form.value.name,form.value.contactNum,form.value.email,form.value.password);
  }
}

