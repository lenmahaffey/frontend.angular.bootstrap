import { NgModule } from '@angular/core';
import { NotificationManagerComponent } from './notification/notification-manager/notification-manager.component';
import { AlertComponent } from './alert/alert/alert.component';
import { AlertManagerComponent } from './alert/alert-manager/alert-manager.component';
import { NotificationComponent } from './notification/notification/notification.component';
import { TooltipComponent } from './tooltip/tooltip/tooltip.component';
import { TooltipManagerComponent } from './tooltip/tooltip-manager/tooltip-manager.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@NgModule({
  providers:[
    MatDialog,
  ],
  declarations: [
    NotificationComponent,
    NotificationManagerComponent,
    AlertComponent,
    AlertManagerComponent,
    TooltipComponent,
    TooltipManagerComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports:[
    NotificationManagerComponent,
    AlertManagerComponent,
    TooltipManagerComponent,
  ]
})
export class ServicesModule { }
