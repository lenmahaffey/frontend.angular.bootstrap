import { Component, Input } from '@angular/core';
import { UsersService } from '../../users/users.service';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { InventoryItemCategory_DTO, InventoryItemSubType_DTO, InventoryItemType_DTO, InventoryItem_DTO } from 'src/app/shared/api/api.models';
import { InventoryService } from '../inventory.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent {
  columns: string[] = ['assetId', 'name'];
  inventory: InventoryItem_DTO[] | undefined
  filteredInventory: InventoryItem_DTO[] = []

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
    }
  }

  private _category: InventoryItemCategory_DTO | undefined
  private _type: InventoryItemType_DTO | undefined
  private _subType: InventoryItemSubType_DTO | undefined

  constructor(private api: InventoryService,
              private router: Router,
              private appStateService: AppStateService,
              private notificationService: NotificationService)
  {
    this.getInventoryItems()
  }

  getInventoryItems()
  {
    let sub = this.api.ListInventoryItems(this.category, undefined, this.subType).subscribe({
      next: (data) =>
      {
        console.log(data)
        this.inventory = data
        this.filterInventoryItems()
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
    console.log(this.inventory?.filter(x => x.categoryId == this._category?.id).length)
    this._category == undefined ?
      this.filteredInventory = this.inventory ?? [] :
      this.filteredInventory = this.inventory?.filter(x => x.categoryId == this._category?.id) ?? []

  }

  view(user: any){
    this.router.navigate(['/inventory/edititem', user.id])
  }
}
