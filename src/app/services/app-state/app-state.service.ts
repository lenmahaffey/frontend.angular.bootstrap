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
import { SpinnerOptions } from 'src/app/shared/spinner/SpinnerOptions';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToolTipOptions } from 'src/app/shared/tooltip/tooltip-options';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor(private alertService: AlertService, private notificationService: NotificationService, private modalService: NgbModal){}
  // currentDialogRef: MatDialogRef<any, any> | undefined
  confirmationOptions:Subject<ConfirmationDialogOptions> = new Subject()
  confirmationResponse: Subject<boolean | undefined> = new Subject()
  leftSideNavMenuItems: Subject<MenuItems | undefined> = new Subject<MenuItems | undefined>();
  rightSideText: Subject<TemplateRef<any>> = new Subject<TemplateRef<any>>()
  toolTipOptions: Subject<ToolTipOptions | null> = new Subject<ToolTipOptions | null>();
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

  setToolTip(options: ToolTipOptions)
  {
    this.toolTipOptions.next(options);
  }

  openSpinner(options: SpinnerOptions)
  {
    const modalOptions: NgbModalOptions = {
      backdrop: (options.disableClose ? 'static' : true ),
      keyboard: !options.disableClose,
      centered: true,
      animation: true,
      size: 'sm'

    };
    this.modalService.open(SpinnerComponent, modalOptions)
    this.spinnerOptions.next(options)
  }

  closeSpinner()
  {
    this.modalService.dismissAll()
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

  openDialog(component: any, data: any, options?: ConfirmationDialogOptions) : Observable<any>
  {
    const modalOptions: NgbModalOptions = {
      // backdrop: 'static',
      // keyboard: true,
      centered: false,
      animation: true,
      size: 'lg'
    };
    let modal = this.modalService.open(component, modalOptions)
    if(options){
      this.confirmationOptions.next(options)
    }
    return modal.componentInstance.response
    // const config: MatDialogConfig = (options != null)  ? options : Constants.GetDialogConfig()
    // this.currentDialogRef = this.dialog.open(component, {data});
    // this.currentDialogRef.updatePosition(config.position)
    // config.minWidth != undefined ? this.currentDialogRef.updateSize(`${config.minWidth.toString()}px`) : null
    // this.currentDialogRef.disableClose = false;
    // return this.currentDialogRef.componentInstance.response
  }

  closeDialog()
  {
    this.modalService.dismissAll()
    // if(this.currentDialogRef != undefined)
    // {
    //   this.currentDialogRef.close()
    // }
  }

  openConfirmationDialog(options?: ConfirmationDialogOptions) : Observable<boolean | undefined>
  {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      centered: false,
      animation: true,
    };
    let modal = this.modalService.open(ConfirmationDialogComponent, modalOptions)
    if(options){
      this.confirmationOptions.next(options)
    }
    return modal.componentInstance.response
  }
}
