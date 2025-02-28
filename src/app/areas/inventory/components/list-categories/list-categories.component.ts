import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { InventoryService } from '../../inventory.service';
import { InventoryItemCategory_DTO, InventoryItemType_DTO, InventoryItemSubType_DTO } from 'src/app/shared/api/api.models';
import { AddNewCategoryComponent } from '../add-new-category/add-new-category.component';
import { AddNewTypeComponent } from '../add-new-type/add-new-type.component';
import { InventorySideBarNavLinks } from '../../inventory-side-bar-links';

@Component({
    selector: 'app-view-categories',
    templateUrl: './list-categories.component.html',
    styleUrls: ['./list-categories.component.scss'],
    standalone: false
})
export class ListCategoriesComponent {

  links: InventorySideBarNavLinks = new InventorySideBarNavLinks()
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
    const sub = this.api.ListAllCategories()
    .subscribe({
      next: (data) =>
      {
        this.categories = data
      },
      error: () =>
      {
        this.appStateService.closeSpinner();
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

  openCategoryDialog()
  {
    const dialogRef = this._dialog.open(AddNewCategoryComponent)
    const sub = dialogRef.componentInstance.nameOutput.subscribe(
      {
        next: (data) =>
        {
          this.addNewCategory(data)
        },
        complete: () =>
        {
          dialogRef.close();
          sub.unsubscribe();
        }
      })
  }

  openTypeDialog()
  {
    const config = new MatDialogConfig()
    config.data = this.selectedCategory
    const dialogRef = this._dialog.open(AddNewTypeComponent, config)
    const sub = dialogRef.componentInstance.nameOutput.subscribe(
      {
        next: (data) =>
        {
          this.addNewType(data)
        },
        complete: () =>
        {
          dialogRef.close();
          sub.unsubscribe();
        }
      })
  }

  openSubTypeDialog()
  {
    const config = new MatDialogConfig()
    config.data = this.selectedType
    const dialogRef = this._dialog.open(AddNewTypeComponent, config)
    const sub = dialogRef.componentInstance.nameOutput.subscribe(
      {
        next: (data) =>
        {
          this.addNewSubType(data)
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
    this.appStateService.openSpinner("Creating Category")
    const newCat = new InventoryItemCategory_DTO();
    newCat.name = name
    const sub = this.api.AddNewCategory(newCat).subscribe(
      {
        next: (data) =>
        {
          this.categories.push(data)
          this.categories = this.categories.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          const message = new Message()
          message.text = `The category ${data.name} was created`
          message.type = MessageType.Success
          message.autoDismiss = true
          this.alertService.sendAlert(message)
        },
        error: () =>
        {
          this.appStateService.closeSpinner();
        },
        complete: () =>
        {
          this.appStateService.closeSpinner()
          sub.unsubscribe()
        }
      }
    )
  }

  addNewType(name: string)
  {
    this.appStateService.openSpinner("Creating Type")
    const newType = new InventoryItemType_DTO();
    newType.name = name
    newType.categoryId = this.selectedCategory!.id
    const sub = this.api.AddNewType(newType).subscribe(
      {
        next: (data) =>
        {
          this.types.push(data)
          this.types = this.types.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          const message = new Message()
          message.text = `The ${this.categories.find(x => x.id == data.categoryId)?.name} type ${data.name} was created`
          message.type = MessageType.Success
          message.autoDismiss = true
          this.alertService.sendAlert(message)
        },
        error: () =>
        {
          this.appStateService.closeSpinner();
        },
        complete: () =>
        {
          this.appStateService.closeSpinner()
          sub.unsubscribe()
        }
      })
  }

  addNewSubType(name: string)
  {
    this.appStateService.openSpinner("Creating SubType")
    const newSubType = new InventoryItemSubType_DTO();
    newSubType.name = name
    newSubType.typeId = this.selectedType!.id
    const sub = this.api.AddNewSubType(newSubType).subscribe(
      {
        next: (data) =>
        {
          this.subTypes.push(data)
          this.subTypes = this.subTypes.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          const message = new Message()
          message.text = `The ${this.types.find(x => x.id == data.typeId)?.name} type ${data.name} was created`
          message.type = MessageType.Success
          message.autoDismiss = true
          this.appStateService.closeSpinner()
          this.alertService.sendAlert(message)
        },
        error: () =>
        {
          this.appStateService.closeSpinner();
        },
        complete: () =>
        {
          this.appStateService.closeSpinner()
          sub.unsubscribe()
        }
      })
  }
}
