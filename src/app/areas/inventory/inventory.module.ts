import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { InventoryService } from './inventory.service';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { AddNewCategoryComponent } from './add-new-category/add-new-category.component';
import { AddNewTypeComponent } from './add-new-type/add-new-type.component';
import { AddNewSubTypeComponent } from './add-new-sub-type/add-new-sub-type.component';
import { InventoryImportComponent } from './inventory-import/inventory-import.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AddItemComponent,
    EditItemComponent,
    ViewItemComponent,
    ListItemsComponent,
    ListCategoriesComponent,
    AddNewCategoryComponent,
    AddNewTypeComponent,
    AddNewSubTypeComponent,
    InventoryImportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'inventory/dashboard', component: DashboardComponent },
      { path: 'inventory/listitems', component:  ListItemsComponent},
      { path: 'inventory/additem', component: AddItemComponent },
      { path: 'inventory/edititem/:id', component: EditItemComponent },
      { path: 'inventory/viewcategories', component: ListCategoriesComponent },
      { path: 'inventory/import', component: InventoryImportComponent },
    ]),
    SharedModule
  ],
  providers: [InventoryService]
})
export class InventoryModule { }
