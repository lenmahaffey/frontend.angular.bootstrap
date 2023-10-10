import { Component, OnDestroy, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { DragDropService } from 'src/app/services/dragDrop/drag-drop.service';
import { InventoryItemCategory_DTO, InventoryItemType_DTO, InventoryItemSubType_DTO, InventoryItem_DTO, SalesItem_DTO } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-create-sales-item',
  templateUrl: './create-sales-item.component.html',
  styleUrls: ['./create-sales-item.component.scss']
})
export class CreateSalesItemComponent implements OnDestroy{
  sub: Subscription
  selected: InventoryItemCategory_DTO | InventoryItemType_DTO | InventoryItemSubType_DTO | undefined
  @Output() salesItem: SalesItem_DTO = new SalesItem_DTO()
  categories: InventoryItemCategory_DTO[] = []
  types: InventoryItemType_DTO[] = []
  subTypes: InventoryItemSubType_DTO[] = []

  selectedCategory: InventoryItemCategory_DTO | undefined
  selectedType: InventoryItemType_DTO | undefined
  selectedSubType: InventoryItemSubType_DTO | undefined

  constructor(private dragDropService: DragDropService)
  {
    this.salesItem.inventoryItems = []

    this.sub = this.dragDropService.dropped.subscribe({
      next: (data) =>
      {
        this.salesItem.inventoryItems?.push(data)
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
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
}
