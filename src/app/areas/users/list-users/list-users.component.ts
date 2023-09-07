import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/api/api.models';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { MatDialogConfig } from '@angular/material/dialog';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Message } from 'src/app/services/message';

@Component({
  selector: 'app-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})

export class ListUsersComponent {

  users = []
  displayedColumns: string[] = ['id', 'firstname', 'lastname'];
  data:User[] = []
  dialogConfig: MatDialogConfig
  constructor(private api: UsersService,
              private router: Router,
              private appStateService: AppStateService,
              private notificationService: NotificationService)
  {
    this.dialogConfig = new MatDialogConfig()
    this.dialogConfig.data = "Getting Users"
    appStateService.openSpinner(this.dialogConfig)
    this.api.ListAllUsers().subscribe({
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
    this.router.navigate(['/users/edituser', user.id])
  }
}
