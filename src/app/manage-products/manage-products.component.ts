import {Component, OnInit, AfterViewInit, ViewChild, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, NgForm} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { TourService } from '../services/tour/tour.service';
import { Tour } from '../shared/models/Tour.model';
import { LoginService } from '../services/login/login.service';
import { MerchantService } from '../services/merchant/merchant.service';
import { Merchant } from '../shared/models/merchant.model';


/**
 * @title Table with selection
 */

@Component({
  selector: 'manage-products-component',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
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
    MatTableModule, 
    MatCheckboxModule,
    MatPaginatorModule,
    MatDividerModule
  ],

})

export class ManageProductsComponent implements AfterViewInit {
    constructor(
      public dialog: MatDialog, 
      private tourService: TourService, 
      private loginService: LoginService,
      private merchantService: MerchantService){}
      private merchantId: string;
    tours: Tour[] = [];
    userId: string;

    displayedColumns: string[] = [ 'productID', 'name', 'description', 'quantity', 'price', 'rating', 'edit', 'delete'];
    dataSource = new MatTableDataSource<Tour>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit(){
      this.userId=this.loginService.getUserId();
      console.log(this.userId);
      console.log("user id above");
  
      // Call the getAll method with a specific merchantId
      this.merchantService.getMerchantById(this.userId)
      .subscribe(
        (data) => {
          // Handle the fetched merchant
          console.log(data);
          this.merchantId = data._id;
          this.tourService.getTourByMerchantId(this.merchantId).subscribe(
            (data) => {
              // Handle the fetched tours
              console.log(data);
            },
            (error) => {
              console.error('Error fetching tours:', error);
            }
          );
    
          this.tourService.getToursByMIdUpdateListener().subscribe((updatedTours) => {
            this.dataSource = new MatTableDataSource(updatedTours);
            this.dataSource.paginator = this.paginator;});

        },
        (error) => {
          console.error('Error fetching merchant:', error);
        }
      );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onEdit(tourId: String){
    const dialogRef = this.dialog.open(EditDialog, {
      data: { tourId: tourId},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
  }

      onAdd(){
        const dialogRef = this.dialog.open(AddNewDialog, {
          data: {merchantId :this.merchantId}
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          console.log('Dialog closed with result:', result);
        });
      }

      onDelete(tourId: String){
        const dialogRef = this.dialog.open(DeleteDialog, {
          data: { tourId: tourId},
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          console.log('Dialog closed with result:', result);
        });
      }
      

}

/**
 * @title Delete dialog box
 */

@Component({
    selector: 'delete-dialog',
    templateUrl: './delete-dialog.html',
    styleUrls: ['./manage-products.component.css'],
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
      MatTableModule, 
      MatCheckboxModule,
      MatPaginatorModule,
      MatDividerModule
    ],
  
  })
  
  export class DeleteDialog  {
    constructor(private tourService: TourService, @Inject(MAT_DIALOG_DATA) public data: any){}
    deleteProduct(){this.tourService.deleteTour(this.data.tourId)};
  }

  /**
 * @title Edit dialog box
 */


  @Component({
    selector: 'edit-dialog',
    templateUrl: './edit-dialog.html',
    styleUrls: ['./manage-products.component.css'],
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
      MatTableModule, 
      MatCheckboxModule,
      MatPaginatorModule,
      MatDividerModule
    ],
  
  })
  
  export class EditDialog{
    formData = new FormData();
    constructor(private tourService: TourService, @Inject(MAT_DIALOG_DATA) public data: any){}

    onSubmit(form: NgForm) {
      // Check if the form is valid before submitting
      if (form.valid) {
        // Update the data from the form controls
        const updatedTour = {// Assuming 'id' is the identifier for the tour
          name: form.value.name,
          quantity: form.value.quantity,
          price: form.value.price,
          description: form.value.description,
          // Add other properties as needed
        };
    
        this.tourService.updateTourProduct(updatedTour);};}
    }


    /**
 * @title Edit dialog box
 */


    @Component({
        selector: 'add-new-dialog',
        templateUrl: './add-new-dialog.html',
        styleUrls: ['./manage-products.component.css'],
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
          MatTableModule,
          MatCheckboxModule,
          MatPaginatorModule,
          MatDividerModule
        ],
      
      })
      
      export class AddNewDialog{
        formData = new FormData();
        constructor(public dialog: MatDialog, private tourService: TourService, @Inject(MAT_DIALOG_DATA) public data: any){}

        onSave(form:NgForm){
            if(form.invalid){
              return;
            }
        
            this.tourService.addTour(form.value.name, form.value.quantity, form.value.price, form.value.description, this.formData);
            console.log(form.value.name + "\n" + form.value.quantity + "\n" + form.value.price + "\n" +form.value.description + "\n" + this.formData);
            this.dialog.open(SaveDialog);
          }

        onFileSelected(event: any) {
          const selectedFile = event.target.files[0];
      
          if (selectedFile) {
            // Here, you can perform actions with the selected file, such as uploading it to a server.
            console.log('Selected File:', selectedFile);
          }
          
          this.formData.append('file', selectedFile);
        }
      }

/**
 * @title Save dialog box
 */

@Component({
  selector: 'save-dialog',
  templateUrl: './save-dialog.html',
  styleUrls: ['./manage-products.component.css'],
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
    MatTableModule, 
    MatCheckboxModule,
    MatPaginatorModule,
    MatDividerModule
  ],

})

export class SaveDialog  {

}
