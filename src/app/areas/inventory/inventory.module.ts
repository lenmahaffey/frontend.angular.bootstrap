import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ViewItemComponent } from './components/view-item/view-item.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { InventoryService } from './inventory.service';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { AddNewCategoryComponent } from './components/add-new-category/add-new-category.component';
import { AddNewTypeComponent } from './components/add-new-type/add-new-type.component';
import { AddNewSubTypeComponent } from './components/add-new-sub-type/add-new-sub-type.component';
import { InventoryImportComponent } from './inventory-import/inventory-import.component';
import { GroupItemsComponent } from './components/group-items/group-items.component';
import { AssetReportComponent } from './asset-report/asset-report.component';



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
    GroupItemsComponent,
    AssetReportComponent,
  ],
  exports: [
    ListCategoriesComponent,
    GroupItemsComponent,
    ListItemsComponent
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
      { path: 'inventory/groupItems', component: GroupItemsComponent },
      { path: 'inventory/assetreport', component: AssetReportComponent },
      { path: 'inventory/items', component: GroupItemsComponent },
    ]),
    SharedModule
  ],
  providers: [InventoryService]
})
export class InventoryModule { }
