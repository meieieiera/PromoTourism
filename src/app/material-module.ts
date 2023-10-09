import{NgModule} from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar'
import{MatMenuModule} from '@angular/material/menu'
import{MatIconModule} from '@angular/material/icon'
import{MatButtonModule} from "@angular/material/button"
import{MatInputModule} from "@angular/material/input"
import{MatSelectModule} from "@angular/material/select"
import{MatAutocompleteModule} from "@angular/material/autocomplete"
import{MatSortModule} from "@angular/material/sort"
import{MatDatepickerModule} from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import{MatExpansionModule} from "@angular/material/expansion";
import {MatDialogModule} from '@angular/material/dialog';
import { MatTableModule } from "@angular/material/table";

@NgModule({
    exports:[
       MatToolbarModule,
       MatMenuModule,
       MatIconModule,
       MatButtonModule,
       MatInputModule,
       MatSelectModule,
       MatAutocompleteModule,
       MatSortModule,
       MatDatepickerModule,
       MatNativeDateModule,
       MatRadioModule,
       MatCheckboxModule,
       MatCardModule,
       MatExpansionModule,
       MatDialogModule,
       MatTableModule
    ]
})
export class MaterialModule{}