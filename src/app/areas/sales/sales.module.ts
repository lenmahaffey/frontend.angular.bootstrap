import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSalesItemComponent } from './pages/create-sales-item/create-sales-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InventoryModule } from '../inventory/inventory.module';
import { RouterModule } from '@angular/router';
import { ViewSalesItemComponent } from './components/view-sales-item/view-sales-item.component';
import { SalesService } from './sales.service';



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
  ],
  providers: [ SalesService ]
})
export class SalesModule { }
