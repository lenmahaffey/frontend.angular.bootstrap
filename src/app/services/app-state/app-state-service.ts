import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { SideBarNavLinks } from 'src/app/pages/demo/left-side-bar-nav-links';
import { MenuItems } from 'src/app/shared/menu-items';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { AlertService } from '../alert/alert.service';
import { Message } from '../message';
import { NotificationService } from '../notification/notification.service';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor(private _dialog: MatDialog, private alertService: AlertService, private notificationService: NotificationService){}

  confirmationOptions = new ConfirmationDialogOptions()
  confirmationResponse: Subject<boolean | undefined> = new Subject()
  alertMessage = new Message()
  notificationMessage = new Message()
  leftSideNavMenuItems: Subject<MenuItems> = new Subject<MenuItems>();
  rightSideText: Subject<TemplateRef<any>> = new Subject<TemplateRef<any>>()
  toolTipText: Subject<TemplateRef<any>> = new Subject<TemplateRef<any>>();

  setLeftSideMenuItems(items: SideBarNavLinks)
  {
    this.leftSideNavMenuItems.next(items.links);
  }

  setRightSideNav(text: TemplateRef<any>)
  {
    this.rightSideText.next(text)
  }

  setToolTip(text: TemplateRef<any>)
  {
    this.toolTipText.next(text);
  }

  openSpinner(config: MatDialogConfig)
  {
    this._dialog.open(SpinnerComponent, config);
  }

  closeSpinner()
  {
    this._dialog.closeAll()
  }

  sendAlert()
  {
    this.alertService.sendAlert(this.alertMessage)
  }

  sendNotification()
  {
    this.notificationService.sendNotification(this.notificationMessage)
  }

  openConfirmationDialog(options?: ConfirmationDialogOptions) : Observable<boolean | null>
  {
    const bodyRect = document.body.getBoundingClientRect();
    var config = new MatDialogConfig()
    config.data = options
    config.minWidth = '400px'
    config.disableClose = true
    config.autoFocus = false
    config.position = { left: ((bodyRect.width / 2) - (Number(config.minWidth.replace("px", "")) / 2 )).toString() + "px", top: '7%' }
    let modalRef = this._dialog.open(ConfirmationDialogComponent, config);
    return modalRef.componentInstance.response
  }
  closeConfirmationDialog()
  {
    this._dialog.closeAll()
  }
}
