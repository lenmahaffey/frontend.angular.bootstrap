import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { LeftSideBarNavLinks } from './left-side-bar-nav-links';
import { ToolTipService } from 'src/app/services/tooltip/tooltip.service';
import { ToolTipPosition } from 'src/app/services/tooltip/tooltip-position';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnDestroy{

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
    private appStateService: AppStateService,
    private toolTipService: ToolTipService)
  {
    this.appStateService.setLeftSideMenuItems(new LeftSideBarNavLinks())
    this.appStateService.setLeftSideMenuItems(this.links);

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

  ngOnDestroy(): void {
    this.appStateService.setLeftSideMenuItems(new LeftSideBarNavLinks())
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
    const bodyRect = document.body.getBoundingClientRect();
    var config = new MatDialogConfig()
    config.data =
    {
      title: "Demostration Modal",
      text: "This is a modal",
      yesButtonText: "yes",
      noButtonText: "no",
    }
    config.minWidth = '400px'
    config.disableClose = true;
    config.position = { left: ((bodyRect.width / 2) - (Number(config.minWidth.replace("px", "")) / 2 )).toString() + "px", top: '7%' }
    let modalRef = this._dialog.open(ConfirmationDialogComponent, config);
    let sub = modalRef.componentInstance.response.subscribe((data: boolean | null) => {
        this.setConfirmationResponseMessage(data)
        this._dialog.closeAll()
        sub.unsubscribe()
      })
  }

  openSpinner()
  {
    var config = new MatDialogConfig()
    config.data =
    {
      message: "Fetching Data",
    }
    this.appStateService.openSpinner(config);
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

  toggleToolTipVisibility(event: Event)
  {
    this.toolTipService.toggleVisibility()
  }

  setToolTipText(text: string)
  {
    this.toolTipService.sendText(text)
  }

  setToolTipPosition(event: MouseEvent)
  {
    let position = new ToolTipPosition()
    position.x = event.clientX
    position.y = event.clientY
    this.toolTipService.setPosition(position)
  }


  toggleDuration()
  {
    this.alertMessageFormData.controls['dismiss'].value ?
      this.alertMessageFormData.controls['duration'].enable() :
      this.alertMessageFormData.controls['duration'].disable()
  }
}
