import { NgModule } from '@angular/core';
import { NotificationManagerComponent } from './notification/notification-manager/notification-manager.component';
import { AlertComponent } from './alert/alert/alert.component';
import { AlertManagerComponent } from './alert/alert-manager/alert-manager.component';
import { NotificationComponent } from './notification/notification/notification.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';

@NgModule({
  providers:[
    MatDialog,
  ],
  declarations: [
    NotificationComponent,
    NotificationManagerComponent,
    AlertComponent,
    AlertManagerComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports:[
    NotificationManagerComponent,
    AlertManagerComponent,
  ]
})
export class ServicesModule { }
