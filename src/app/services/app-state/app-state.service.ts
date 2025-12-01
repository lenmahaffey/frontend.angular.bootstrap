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
import { Constants } from 'src/app/constants';
import { SpinnerOptions } from 'src/app/shared/spinner/SpinnerOptions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor(private dialog: MatDialog, private alertService: AlertService, private notificationService: NotificationService, private modalService: NgbModal){}
  currentDialogRef: MatDialogRef<any, any> | undefined
  confirmationOptions = new ConfirmationDialogOptions()
  confirmationResponse: Subject<boolean | undefined> = new Subject()
  leftSideNavMenuItems: Subject<MenuItems | undefined> = new Subject<MenuItems | undefined>();
  rightSideText: Subject<TemplateRef<any>> = new Subject<TemplateRef<any>>()
  toolTipText: Subject<TemplateRef<any>> = new Subject<TemplateRef<any>>();
  spinnerOptions: Subject<SpinnerOptions | null> = new Subject<SpinnerOptions | null>();

  setLeftSideMenuItems(items?: SideBarNavLinks)
  {
    if(items)
    {
      this.leftSideNavMenuItems.next(items.links);
    }
    else{
      this.leftSideNavMenuItems.next(undefined);
    }
  }

  setRightSideNav(text: TemplateRef<any>)
  {
    this.rightSideText.next(text)
  }

  setToolTip(text: TemplateRef<any>)
  {
    this.toolTipText.next(text);
  }

  openSpinner(options: SpinnerOptions)
  {
    this.spinnerOptions.next(options)
  }

  closeSpinner()
  {
    this.spinnerOptions.next(null)
  }

  sendAlert(message: Message)
  {
    this.alertService.sendAlert(message)
  }

  sendNotification(message: Message)
  {
    this.notificationService.sendNotification(message)
  }

  openDialog(component: any, data: any, options?: MatDialogConfig) : Observable<any>
  {
    const config: MatDialogConfig = (options != null)  ? options : Constants.GetDialogConfig()
    this.currentDialogRef = this.dialog.open(component, {data});
    this.currentDialogRef.updatePosition(config.position)
    config.minWidth != undefined ? this.currentDialogRef.updateSize(`${config.minWidth.toString()}px`) : null
    this.currentDialogRef.disableClose = false;
    return this.currentDialogRef.componentInstance.response
  }

  closeDialog()
  {
    if(this.currentDialogRef != undefined)
    {
      this.currentDialogRef.close()
    }
  }

  openConfirmationDialog(options?: ConfirmationDialogOptions) : Observable<boolean | null>
  {
    this.currentDialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {options}});
    return this.currentDialogRef.componentInstance.response
  }
}
