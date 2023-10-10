import { Component } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { InventorySideBarNavLinks } from '../inventory-side-bar-links';
import { InventoryItemCategory_DTO, InventoryItemSubType_DTO, InventoryItemType_DTO } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  columns: string[] = []

  categories: InventoryItemCategory_DTO[] = []
  types: InventoryItemType_DTO[] = []
  subTypes: InventoryItemSubType_DTO[] = []

  selectedCategory: InventoryItemCategory_DTO | undefined
  selectedType: InventoryItemType_DTO | undefined
  selectedSubType: InventoryItemSubType_DTO | undefined

  links: InventorySideBarNavLinks = new InventorySideBarNavLinks()
  constructor(private notificationService: NotificationService,
              private appStateService: AppStateService)
  {
    this.appStateService.setLeftSideMenuItems(this.links)
  }

  selectItems(s: InventoryItemCategory_DTO | InventoryItemType_DTO | InventoryItemSubType_DTO)
  {
    if(("types" in s))
    {
      this.selectCategory(s)
    }
    else if (("subTypes" in s))
    {
      this.selectType(s)
    }
    else
    {
      this.selectSubType(s as InventoryItemSubType_DTO)
    }
  }
  
  selectCategory(catagory: InventoryItemCategory_DTO | undefined)
  {
    this.selectedCategory = catagory
  }

  selectType(type: InventoryItemType_DTO | undefined)
  {
    this.selectedType = type
  }

  selectSubType(event: InventoryItemSubType_DTO| undefined)
  {
    this.selectedSubType = event
  }
}
