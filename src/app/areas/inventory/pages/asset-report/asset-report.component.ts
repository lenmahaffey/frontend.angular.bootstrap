import { Component } from '@angular/core';
import { InventoryItemCategory_DTO } from 'src/app/shared/api/api.models';
import { InventoryService } from '../../inventory.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { InventorySideBarNavLinks } from '../../inventory-side-bar-links';

@Component({
    selector: 'app-asset-report',
    templateUrl: './asset-report.component.html',
    styleUrls: ['./asset-report.component.scss'],
    standalone: false
})
export class AssetReportComponent {

  links: InventorySideBarNavLinks = new InventorySideBarNavLinks()
  categories: InventoryItemCategory_DTO[] = []
  values: any = []

  constructor(private api: InventoryService,
    private alertService:AlertService,
    private notificationService: NotificationService,
    private _dialog: MatDialog,
    private appStateService: AppStateService)
  {
    this.appStateService.setLeftSideMenuItems(this.links)
    this.getCategories()
    this.getValues()
  }

  getValues()
  {
    let sub = this.api.GetInventoryValue().subscribe(
      {
        next: (data) =>
        {
          this.values = data
        },
        error: (error) =>
        {
        },
        complete: () =>
        {
          sub.unsubscribe();
        }
      }
    )
  }
  getCategories()
  {
    let sub = this.api.ListAllCategories().subscribe(
    {
      next: (data) =>
      {
        this.categories = data
      },
      error: (error) =>
      {
      },
      complete: () =>
      {
        sub.unsubscribe();
      }
    })
  }
}
