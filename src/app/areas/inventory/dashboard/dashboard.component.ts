import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { InventorySideBarNavLinks } from '../inventory-side-bar-links';
import { InventoryService } from '../inventory.service';
import { InventoryItemCategory_DTO, InventoryItemSubType_DTO, InventoryItemType_DTO } from 'src/app/shared/api/api.models';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  columns: string[] = []
  categories: InventoryItemCategory_DTO[] = []
  types: InventoryItemType_DTO[] = []
  subTypes: InventoryItemSubType_DTO[] = []
  links: InventorySideBarNavLinks = new InventorySideBarNavLinks()
  constructor(private api: InventoryService,
              private alertService:AlertService,
              private notificationService: NotificationService,
              private _dialog: MatDialog,
              private appStateService: AppStateService)
  {
    this.appStateService.setLeftSideMenuItems(this.links)
    let catSub = this.api.ListAllCategories().subscribe({
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
        catSub.unsubscribe();
        this.appStateService.closeSpinner()
      }
    })

  }
  getTypes(event: any)
  {
    this.types = event.types
  }
  getSubTypes(event: any)
  {
    console.log(event)
    this.subTypes = event.subTypes
  }
}
