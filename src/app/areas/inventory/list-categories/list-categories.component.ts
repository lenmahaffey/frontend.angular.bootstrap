import { Component, EventEmitter, Output } from '@angular/core';
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
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent {

  categories: InventoryItemCategory_DTO[] = []
  types: InventoryItemType_DTO[] = []
  subTypes: InventoryItemSubType_DTO[] = []

  @Output() categoryOutput: EventEmitter<InventoryItemCategory_DTO | undefined> = new EventEmitter()
  @Output() typeOutput: EventEmitter<InventoryItemType_DTO | undefined> = new EventEmitter()
  @Output() subTypeOutput: EventEmitter<InventoryItemSubType_DTO | undefined> = new EventEmitter()

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
        this.appStateService.closeSpinner()
      },
      complete: () =>
      {
        sub.unsubscribe();
        this.appStateService.closeSpinner()
      }
    })
  }

  selectCategory(category: InventoryItemCategory_DTO)
  {
    this.categoryOutput.next(category)
    this.selectedCategory = category
    this.types = category.types || []
    this.selectedType = undefined
  }

  selectType(type: InventoryItemType_DTO)
  {
    this.typeOutput.next(type)
    this.selectedType = type
    this.subTypes = type.subTypes || []
    this.selectedSubType = undefined
  }

  selectSubType(subType: InventoryItemSubType_DTO)
  {
    this.subTypeOutput.next(subType)
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
    let config = new MatDialogConfig()
    config.data = this.selectedCategory
    let dialogRef = this._dialog.open(AddNewTypeComponent, config)
    let sub = dialogRef.componentInstance.nameOutput.subscribe(
      {
        next: (data) =>
        {
          this.addNewType(data)
        },
        error: (error)=>
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
    let config = new MatDialogConfig()
    config.data = this.selectedType
    let dialogRef = this._dialog.open(AddNewTypeComponent, config)
    let sub = dialogRef.componentInstance.nameOutput.subscribe(
      {
        next: (data) =>
        {
          this.addNewSubType(data)
        },
        error: (error)=>
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
    let config:MatDialogConfig = new MatDialogConfig()
    config.data =
    {
      message: "Creating Type",
    }
    config.disableClose = true
    this.appStateService.openSpinner(config)
    let newType = new InventoryItemType_DTO();
    newType.name = name
    newType.categoryId = this.selectedCategory!.id
    let sub = this.api.AddNewType(newType).subscribe(
      {
        next: (data) =>
        {
          this.types.push(data)
          this.types = this.types.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          let message = new Message()
          message.text = `The ${this.categories.find(x => x.id == data.categoryId)?.name} type ${data.name} was created`
          message.type = MessageType.Success
          message.autoDismiss = true
          this.appStateService.closeSpinner()
          this.alertService.sendAlert(message)
        },
        error: (error)=>
        {
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      })
  }

  addNewSubType(name: string)
  {
    let config:MatDialogConfig = new MatDialogConfig()
    config.data =
    {
      message: "Creating SubType",
    }
    config.disableClose = true
    this.appStateService.openSpinner(config)
    let newSubType = new InventoryItemSubType_DTO();
    newSubType.name = name
    newSubType.typeId = this.selectedType!.id
    let sub = this.api.AddNewSubType(newSubType).subscribe(
      {
        next: (data) =>
        {
          this.subTypes.push(data)
          this.subTypes = this.subTypes.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          let message = new Message()
          message.text = `The ${this.types.find(x => x.id == data.typeId)?.name} type ${data.name} was created`
          message.type = MessageType.Success
          message.autoDismiss = true
          this.appStateService.closeSpinner()
          this.alertService.sendAlert(message)
        },
        error: (error)=>
        {
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      })
  }
}
