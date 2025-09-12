import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User_DTO } from 'src/app/shared/api/api.models';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Message } from 'src/app/services/message';

@Component({
    selector: 'app-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss'],
    standalone: false
})

export class ListUsersComponent {

  users = []
  displayedColumns: string[] = ['id', 'username','firstname', 'lastname'];
  data:User_DTO[] = []
  constructor(private api: UserService,
              private router: Router,
              private appStateService: AppStateService,
              private notificationService: NotificationService)
  {
    appStateService.openSpinner("Getting Users")
    this.api.ListAllUsers().subscribe({
      next: (data) =>
      {
        this.data = data
      },
      error: (error) =>
      {
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
