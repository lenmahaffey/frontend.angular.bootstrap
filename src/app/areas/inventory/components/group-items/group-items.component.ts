import { Component, Input } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { InventoryItemCategory_DTO, InventoryItemSubType_DTO, InventoryItemType_DTO, InventoryItem_DTO } from 'src/app/shared/api/api.models';
import { InventoryService } from '../../inventory.service';
import { CurrencyFormatterPipe } from 'src/app/shared/pipes/currency-formatter.pipe';
import { InventoryNode } from './inventory-node';

@Component({
  selector: 'app-group-items',
  templateUrl: './group-items.component.html',
  styleUrls: ['./group-items.component.scss']
})
export class GroupItemsComponent {
  inventory: InventoryItem_DTO[] | undefined
  filteredInventory: InventoryItem_DTO[] = []
  groupedInventory: Map<string, InventoryItem_DTO[]> = new Map()

  @Input() public get category() : InventoryItemCategory_DTO | undefined
  {
    return this._category
  }

  public set category(value)
  {
    this._category = value
    this._type = undefined
    this._subType = undefined
    if(this.inventory != undefined)
    {
      this.filterInventoryItems()
      this.groupInventory()
    }
  }

  @Input() public get type(): InventoryItemType_DTO | undefined
  {
    return this._type
  }

  public set type(value)
  {
    this._type = value
    this.subType = undefined
    if(this.inventory != undefined)
    {
      this.filterInventoryItems()
      this.groupInventory()
    }
  }

  @Input() public get subType(): InventoryItemSubType_DTO | undefined
  {
    return this._subType
  }

  public set subType(value)
  {
    this._subType = value
    if(this.inventory != undefined)
    {
      this.filterInventoryItems()
      this.groupInventory()
    }
  }

  private _category: InventoryItemCategory_DTO | undefined
  private _type: InventoryItemType_DTO | undefined
  private _subType: InventoryItemSubType_DTO | undefined

  constructor(private api: InventoryService,
    private router: Router,
    private appStateService: AppStateService,
    private notificationService: NotificationService,
    private currencyFormatter: CurrencyFormatterPipe)
  {
    this.getInventoryItems()
  }

  getInventoryItems()
  {
    let spinnerConfig = new MatDialogConfig()
    spinnerConfig.disableClose = true
    spinnerConfig.data = {message: "Getting Inventory"}
    this.appStateService.openSpinner(spinnerConfig);
    let sub = this.api.ListInventoryItems(this.category, undefined, this.subType).subscribe({
      next: (data) =>
      {
        this.inventory = data
        this.filterInventoryItems()
        this.groupInventory()
      },
      error: (error) =>
      {
      },
      complete: () =>
      {
        sub.unsubscribe
        this.appStateService.closeSpinner()
      }
    })
  }

  filterInventoryItems()
  {
    if(this._category == undefined)
    {
      this.filteredInventory = this.inventory ?? []
      return
    }
    else
    {
      this.filteredInventory = this.inventory?.filter(x => x.categoryId == this._category?.id) ?? []
    }

    if(this._type != undefined)
    {
      this.filteredInventory = this.inventory?.filter(x => x.typeId == this._type?.id) ?? []
    }
    if(this._subType != undefined)
    {
      this.filteredInventory = this.inventory?.filter(x => x.subTypeId == this._subType?.id) ?? []
    }
  }

  groupInventory()
  {
    if(this.filteredInventory != undefined)
      {
        this.groupedInventory = this.filteredInventory.reduce(
          (entryMap, e) => entryMap.set(e.name, [...entryMap.get(e.name)||[], e]),
          new Map())
      }
  }
}
