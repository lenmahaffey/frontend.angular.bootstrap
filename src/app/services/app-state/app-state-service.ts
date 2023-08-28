import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SideBarNavLinks } from 'src/app/pages/demo/left-side-bar-nav-links';
import { MenuItems } from 'src/app/shared/menu-items';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor(private _dialog: MatDialog){}

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
    let dref = this._dialog.open(SpinnerComponent, config);
  }

  closeSpinner()
  {
    this._dialog.closeAll()
  }
}
