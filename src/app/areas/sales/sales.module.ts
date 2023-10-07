import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSalesItemComponent } from './create-sales-item/create-sales-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InventoryModule } from '../inventory/inventory.module';
import { RouterModule } from '@angular/router';
import { ViewSalesItemComponent } from './view-sales-item/view-sales-item.component';



@NgModule({
  declarations: [
    CreateSalesItemComponent,
    ViewSalesItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InventoryModule,
    RouterModule.forChild([
      { path: 'sales/createitem', component: CreateSalesItemComponent }
    ]),
  ]
})
export class SalesModule { }
