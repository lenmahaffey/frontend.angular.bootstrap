import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { SideBarNavLinks } from 'src/app/pages/demo/left-side-bar-nav-links';
import { MenuItems } from 'src/app/shared/menu-items';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { AlertService } from '../alert/alert.service';
import { Message } from '../message';
import { NotificationService } from '../notification/notification.service';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MessageType } from '../message-type.interface';
import { Constants } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor(private dialog: MatDialog, private alertService: AlertService, private notificationService: NotificationService){}
  currentModalRef: MatDialogRef<any, any> | undefined
  confirmationOptions = new ConfirmationDialogOptions()
  confirmationResponse: Subject<boolean | undefined> = new Subject()
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

  openSpinner(message: string = "Spinning the Spinner", disableClose: boolean = true)
  {
    const options = new MatDialogConfig()
    options.data =
    {
      message: message
    }
    options.disableClose = disableClose
    this.dialog.open(SpinnerComponent, options);
  }

  closeSpinner()
  {
    this.dialog.closeAll()
  }

  sendAlert(message: Message)
  {
    this.alertService.sendAlert(message)
  }

  sendNotification()
  {
    this.notificationService.sendNotification(this.notificationMessage)
  }

  openDialog(component: any, data: any, options?: MatDialogConfig) : Observable<any>
  {
    const config: MatDialogConfig = (options != null)  ? options : Constants.GetModalConfig()
    this.currentModalRef = this.dialog.open(component, {data});
    this.currentModalRef.updatePosition(config.position)
    config.minWidth != undefined ? this.currentModalRef.updateSize(`${config.minWidth.toString()}px`) : null
    this.currentModalRef.disableClose = false;
    return this.currentModalRef.componentInstance.response
  }

  closeDialog()
  {
    if(this.currentModalRef != undefined)
    {
      this.currentModalRef.close()
    }
  }

  openConfirmationDialog(options?: ConfirmationDialogOptions) : Observable<boolean | null>
  {
    this.currentModalRef = this.dialog.open(ConfirmationDialogComponent, {data: {options}});
    return this.currentModalRef.componentInstance.response
  }
}
