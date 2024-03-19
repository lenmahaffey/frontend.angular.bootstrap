import { Component, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';
import { LeftSideBarNavLinks } from './left-side-bar-nav-links';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnDestroy, OnInit {

  keys: any[] = []
  types = MessageType
  alertMessageFormData: any
  notificationMessageFormData: any
  confirmationResponseMessage: string = "Please open the confimation dialog and make a selection"
  links: LeftSideBarNavLinks = new LeftSideBarNavLinks()

  constructor(
    private alertService:AlertService,
    private notificationService: NotificationService,
    private _dialog: MatDialog,
    private appState: AppStateService)
  {
    this.appState.setLeftSideMenuItems(new LeftSideBarNavLinks())
    this.appState.setLeftSideMenuItems(this.links);

    let temp: any[] = Object.values(this.types).filter(f => !isNaN(Number(f)));
    temp.forEach(key =>{
      this.keys.push(parseInt(key))
    })

    this.alertMessageFormData = new FormGroup({
      type: new FormControl(0),
      title: new FormControl(""),
      text: new FormControl("Enter alert text"),
      dismiss: new FormControl(false),
      duration: new FormControl({value: 1, disabled: true})
    });

    this.notificationMessageFormData = new FormGroup({
      type: new FormControl(0),
      title: new FormControl("Enter notification title"),
      text: new FormControl("Enter notification text"),
    });
  }

  ngOnInit(): void {
    console.log("Environemnt Name: " + environment.name + (isDevMode() ? " is a developemnt environemnt" : " is a production environment"));
  }
  ngOnDestroy(): void {
    this.appState.setLeftSideMenuItems(new LeftSideBarNavLinks())
  }

  sendNotification()
  {
    var message = new Message()
    message.type = this.notificationMessageFormData.value.type
    message.title = this.notificationMessageFormData.value.title
    message.text = this.notificationMessageFormData.value.text
    this.notificationService.sendNotification(message);
  }

  sendAlert()
  {
    var message = new Message()
    message.type = parseInt(this.alertMessageFormData.value.type)
    message.title = "" //Unused with alerts
    message.text = this.alertMessageFormData.value.text
    message.autoDismiss = this.alertMessageFormData.value.dismiss
    message.duration = this.alertMessageFormData.value.duration
    this.alertService.sendAlert(message);
  }

  openConfirmationDialog()
  {
    const options = new ConfirmationDialogOptions()
    options.text = "This is a modal"
    options.title = "Confirmation Dialog"
    let sub = this.appState.openConfirmationDialog(options).subscribe(
      {
        next: (data) =>
        {
          this.setConfirmationResponseMessage(data)
          this._dialog.closeAll()
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

  openSpinner()
  {
    this.appState.openSpinner("Fetching Data");
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

  toggleDuration()
  {
    this.alertMessageFormData.controls['dismiss'].value ?
      this.alertMessageFormData.controls['duration'].enable() :
      this.alertMessageFormData.controls['duration'].disable()
  }
}
