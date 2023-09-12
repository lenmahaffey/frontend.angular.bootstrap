import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { InventoryService } from '../inventory.service';
import { InventoryItemCategory_DTO, InventoryItemType_DTO, InventoryItemSubType_DTO } from 'src/app/shared/api/api.models';

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

  let sub = this.api.ListAllCategories()
    .subscribe({
      next: (data) =>
      {
      this.categories = data
      console.log(data)
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
    console.log(type)
    this.selectedType = type
    this.subTypes = type.subTypes
  }
}
