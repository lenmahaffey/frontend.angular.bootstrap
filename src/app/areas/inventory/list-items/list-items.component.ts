import { Component } from '@angular/core';
import { UsersService } from '../../users/users.service';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { InventoryItem_DTO } from 'src/app/shared/api/api.models';
import { InventoryService } from '../inventory.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent {
  columns: string[] = ['assetId', 'name'];

  data: InventoryItem_DTO[] = []

  constructor(private api: InventoryService,
              private router: Router,
              private appStateService: AppStateService,
              private notificationService: NotificationService)
  {
    this.api.ListAllItems().subscribe({
      next: (data) =>
      {
        this.data = data
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
        this.appStateService.closeSpinner()
      }
    })
  }

  view(user: any){
    this.router.navigate(['/inventory/edititem', user.id])
  }
}
