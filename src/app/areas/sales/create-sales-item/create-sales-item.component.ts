import { ChangeDetectorRef, Component } from '@angular/core';
import { InventoryItemCategory_DTO, InventoryItemType_DTO, InventoryItemSubType_DTO, InventoryItem_DTO } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-create-sales-item',
  templateUrl: './create-sales-item.component.html',
  styleUrls: ['./create-sales-item.component.scss']
})
export class CreateSalesItemComponent {

  itemList: InventoryItem_DTO[] = []
  categories: InventoryItemCategory_DTO[] = []
  types: InventoryItemType_DTO[] = []
  subTypes: InventoryItemSubType_DTO[] = []

  selectedCategory: InventoryItemCategory_DTO | undefined
  selectedType: InventoryItemType_DTO | undefined
  selectedSubType: InventoryItemSubType_DTO | undefined

  constructor(private cdk:ChangeDetectorRef)
  {

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
  drop(event: any) {
    const name = event.item.element.nativeElement.querySelector("#groupName").innerText
    const assetId = event.item.element.nativeElement.querySelector("input").value
  }
}
