import { Component, OnDestroy, OnInit, TemplateRef, isDevMode } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';
import { LeftSideBarNavLinks } from './left-side-bar-nav-links';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    standalone: false
})

export class DemoComponent implements OnDestroy, OnInit {

  confirmationResponseMessage: string = "Please open the confimation dialog and make a selection"

  constructor(
    private alertService:AlertService,
    private notificationService: NotificationService,
    private appState: AppStateService) {
    this.appState.setLeftSideMenuItems(new LeftSideBarNavLinks())
  }

  ngOnInit(): void {
    console.log("Environemnt Name: " + environment.name + (isDevMode() ? " is a developemnt environemnt" : " is a production environment"));
  }

  ngOnDestroy(): void {
    this.appState.setLeftSideMenuItems(new LeftSideBarNavLinks())
  }

  openConfirmationDialog()
  {
    const options = new ConfirmationDialogOptions()
    options.text = "This is a dialog"
    options.title = "Confirmation Dialog"
    let sub = this.appState.openConfirmationDialog(options).subscribe(
      {
        next: (data) =>
        {
          this.setConfirmationResponseMessage(data)
          this.appState.closeDialog()
          sub.unsubscribe()
        },
        error: () =>
        {
          let message = new Message()
          message.type = MessageType.Error
          message.text = "There was an error"
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      })
  }

  setConfirmationResponseMessage(data: boolean | null)
  {
    if(data == null)
    {
      this.confirmationResponseMessage = "You did not make a selection"
    }
    else if(data)
    {
      this.confirmationResponseMessage = "You clicked yes"
    }
    else
    {
      this.confirmationResponseMessage = this.confirmationResponseMessage = "You clicked no"
    }
  }
}
