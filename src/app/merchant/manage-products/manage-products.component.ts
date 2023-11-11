import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
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
import { DocumentService } from '../../services/merchant/uploadDoc.service'; 
import { Document } from '../../services/merchant/document.model';
import { forwardRef } from "@angular/core";
import { Merchant } from '../merchant.model';
import { MerchantService } from '../merchant.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


export interface TourProduct {
    position: number,
  productID: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  rating: number;
}

const TOURPRODUCT_DATA: TourProduct[] = [
  {position: 1, productID: 'TP001', name: 'Bako National Park with Sea Stack Formation Day Tour in Kuching', description: 'Embark on an immersive day tour into the wilderness of Sarawak’s oldest and most renowned national park!' +
  '\nWander around Bako National Park’s sun-dappled trails and observe its resident stars, the proboscis monkeys\n' +
  'Traverse a verdant forest to discover jungle streams, sweeping coastlines, secret coves, and spot rare wildlife\n' +
  'Marvel at the park’s famous sea stacks, which are outcrops near the shore, and take snapshots of them', price: 310, quantity: 2000, rating: 4.0},
  {position: 2, productID: 'TP031', name: 'Kuala Lumpur Suburbs and Batu Caves Tour', description: "Leave the busy city behind for a chance to explore Kuala Lumpur's beautiful countryside\n"+
  "Visit the rural Malay villages, the Royal Selangor Pewter, Chocolate Shops and more\n"+
  "Discover the Batu Caves, a Hindu temple and catch a glimpse of the city from the height of 272 steps\n"+
  "Learn about Malaysia's rich history, traditions and customs in the suburbs",  price: 40, quantity: 1643, rating: 4.5},
  {position: 3, productID: 'TP426', name: 'Cameron Highlands Day Tour', description: "Leave the busy Kuala Lumpur for an amazing wilderness adventure in the Cameron Highlands\n"+
  "Learn about tea production, visit bee and butterfly farms enjoy marvelous valley views\n"+
  "Taste and pick fresh strawberries at the local strawberry farm and cool down by a waterfall\n"+
  "Head over to the fruit and vegetable market to enjoy fresh produce and try bargaining like a local", price: 340, quantity: 213, rating: 5.0},

];

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
    constructor(public dialog: MatDialog){}

    displayedColumns: string[] = [ 'productID', 'name', 'description', 'quantity', 'price', 'rating', 'edit','delete'];
    dataSource = new MatTableDataSource<TourProduct>(TOURPRODUCT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

      onEdit(){
        this.dialog.open(EditDialog);
      }

      onAdd(){
        this.dialog.open(AddNewDialog);
      }

      onDelete(){
        this.dialog.open(DeleteDialog);
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
    onFileSelected(event: any) {
      const selectedFile = event.target.files[0];
  
      if (selectedFile) {
        // Here, you can perform actions with the selected file, such as uploading it to a server.
        console.log('Selected File:', selectedFile);
      }
    }

    
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
        constructor(public dialog: MatDialog){}

        onSave(){
          this.dialog.open(SaveDialog);
        }

        onFileSelected(event: any) {
          const selectedFile = event.target.files[0];
      
          if (selectedFile) {
            // Here, you can perform actions with the selected file, such as uploading it to a server.
            console.log('Selected File:', selectedFile);
          }
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
