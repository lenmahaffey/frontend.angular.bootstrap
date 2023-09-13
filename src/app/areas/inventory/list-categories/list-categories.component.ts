import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { InventoryService } from '../inventory.service';
import { InventoryItemCategory_DTO, InventoryItemType_DTO, InventoryItemSubType_DTO } from 'src/app/shared/api/api.models';
import { AddNewCategoryComponent } from '../add-new-category/add-new-category.component';
import { AddNewTypeComponent } from '../add-new-type/add-new-type.component';
import { AddNewSubTypeComponent } from '../add-new-sub-type/add-new-sub-type.component';

@Component({
  selector: 'app-view-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent {

  categories: InventoryItemCategory_DTO[] = []
  types: InventoryItemType_DTO[] = []
  subTypes: InventoryItemSubType_DTO[] = []

  selectedCategory: InventoryItemCategory_DTO | undefined
  selectedType: InventoryItemType_DTO | undefined
  selectedSubType: InventoryItemSubType_DTO | undefined

  constructor(private api: InventoryService,
    private alertService:AlertService,
    private notificationService: NotificationService,
    private _dialog: MatDialog,
    private appStateService: AppStateService)
  {
    this.getCategories()
  }

  getCategories()
  {
    let sub = this.api.ListAllCategories()
    .subscribe({
      next: (data) =>
      {
      this.categories = data
      },
      error: (error) =>
      {
      let message = new Message(MessageType.Error);
      message.title = "Error!"
      message.text = error
      this.notificationService.sendNotification(message)
      this.appStateService.closeSpinner()
      },
      complete: () =>
      {
      sub.unsubscribe();
      this.appStateService.closeSpinner()
      }
    })
  }

  getTypes(category: any)
  {
    this.selectedCategory = category
    this.types = category.types
    this.selectedType = undefined
  }

  getSubTypes(type: any)
  {
    this.selectedType = type
    this.subTypes = type.subTypes
  }

  selectSubType(subType: InventoryItemSubType_DTO)
  {
    console.log(subType)
    this.selectedSubType = subType
  }

  openCategoryModal()
  {
    let dialogRef = this._dialog.open(AddNewCategoryComponent)
    let sub = dialogRef.componentInstance.nameOutput.subscribe(
      {
        next: (data) =>
        {
          this.addNewCategory(data)
        },
        error: ()=>
        {

        },
        complete: () =>
        {
          dialogRef.close();
          sub.unsubscribe();
        }
      })
  }

  openTypeModal()
  {
    let dialogRef = this._dialog.open(AddNewTypeComponent)
    let sub = dialogRef.componentInstance.nameOutput.subscribe(
      {
        next: (data) =>
        {
          this.addNewCategory(data)
        },
        error: ()=>
        {

        },
        complete: () =>
        {
          dialogRef.close();
          sub.unsubscribe();
        }
      })
  }

  openSubTypeModal()
  {
    let dialogRef = this._dialog.open(AddNewSubTypeComponent)
    let sub = dialogRef.componentInstance.nameOutput.subscribe(
      {
        next: (data) =>
        {
          this.addNewCategory(data)
        },
        error: ()=>
        {

        },
        complete: () =>
        {
          dialogRef.close();
          sub.unsubscribe();
        }
      })
  }
  addNewCategory(name: string)
  {
    let config:MatDialogConfig = new MatDialogConfig()
    config.data =
    {
      message: "Creating Category",
    }
    config.disableClose = true
    this.appStateService.openSpinner(config)
    let newCat = new InventoryItemCategory_DTO();
    newCat.name = name
    let sub = this.api.AddNewCategory(newCat).subscribe(
      {
        next: (data) =>
        {
          this.categories.push(data)
          this.categories = this.categories.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          let message = new Message()
          message.text = `The category ${data.name} was created`
          message.type = MessageType.Success
          message.autoDismiss = true
          this.appStateService.closeSpinner()
          this.alertService.sendAlert(message)
        },
        error: () =>
        {

        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  addNewType(name: string)
  {

  }

  addNewSubType(name: string)
  {

  }
}
