import { Component, OnDestroy, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { InventoryService } from 'src/app/areas/inventory/inventory.service';
import { DragDropService } from 'src/app/services/dragDrop/drag-drop.service';
import { InventoryItemCategory_DTO, InventoryItemType_DTO, InventoryItemSubType_DTO, SalesItem_DTO, InventoryItem_DTO, InventorySalesItem_DTO } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-create-sales-item',
  templateUrl: './create-sales-item.component.html',
  styleUrls: ['./create-sales-item.component.scss']
})
export class CreateSalesItemComponent implements OnDestroy{
  selected: InventoryItemCategory_DTO | InventoryItemType_DTO | InventoryItemSubType_DTO | undefined
  @Output() salesItem: SalesItem_DTO = new SalesItem_DTO()
  categories: InventoryItemCategory_DTO[] = []
  types: InventoryItemType_DTO[] = []
  subTypes: InventoryItemSubType_DTO[] = []

  selectedCategory: InventoryItemCategory_DTO | undefined
  selectedType: InventoryItemType_DTO | undefined
  selectedSubType: InventoryItemSubType_DTO | undefined

  constructor(private inventoryService: InventoryService)
  {
    this.salesItem.inventoryItems = []
  }

  ngOnDestroy(): void {
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

  selectSubType(subType: InventoryItemSubType_DTO | undefined)
  {
    this.selectedSubType = subType
  }

  dropped(event: any)
  {
    console.log(this.salesItem)
    const item = JSON.parse(event.item.element.nativeElement.querySelector("input").value)
    const existingItemIndex = this.salesItem.inventoryItems!.findIndex(x => x.inventoryItem.id == item.id)
    if(existingItemIndex >= 0)
    {
      console.log(existingItemIndex)
      this.salesItem.inventoryItems![existingItemIndex].quantity += 1
      console.log(this.salesItem)
    }
    else
    {
      const newItem = new InventorySalesItem_DTO()
      newItem.inventoryItemId = item.id
      newItem.inventoryItem = item
      newItem.salesItem = this.salesItem
      newItem.salesItemId = this.salesItem.id
      newItem.quantity = 1
      this.salesItem.inventoryItems?.push(newItem)
    }
  }
}
