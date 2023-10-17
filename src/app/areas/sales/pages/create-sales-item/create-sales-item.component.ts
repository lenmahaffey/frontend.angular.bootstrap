import { Component, OnDestroy } from '@angular/core';
import { InventoryService } from 'src/app/areas/inventory/inventory.service';
import { InventoryItemCategory_DTO, InventoryItemType_DTO, InventoryItemSubType_DTO, SalesItem_DTO, InventoryItem_DTO, InventorySalesItem_DTO } from 'src/app/shared/api/api.models';
import { SalesService } from '../../sales.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-sales-item',
  templateUrl: './create-sales-item.component.html',
  styleUrls: ['./create-sales-item.component.scss']
})

export class CreateSalesItemComponent {
  salesItemInput: any
  salesItemInventoryInput: InventoryItem_DTO[] = []
  typeDisabled = true
  subTypeDisabled = true
  categories: InventoryItemCategory_DTO[] = []
  types: InventoryItemType_DTO[] = []
  subTypes: InventoryItemSubType_DTO[] = []

  selectedCategory: InventoryItemCategory_DTO | undefined
  selectedType: InventoryItemType_DTO | undefined
  selectedSubType: InventoryItemSubType_DTO | undefined

  selected: InventoryItemCategory_DTO | InventoryItemType_DTO | InventoryItemSubType_DTO | undefined

  constructor(private inventoryService: InventoryService, private salesService: SalesService)
  {
    this.salesItemInput = new FormGroup({
      category: new FormControl(""),
      type: new FormControl(""),
      subType: new FormControl(""),
      name: new FormControl(""),
      description: new FormControl(""),
      quantity: new FormControl(1)
    });
    this.salesItemInput.get('type').disable()
    this.salesItemInput.get('subType').disable()
    this.inventoryService.ListAllCategories().subscribe(
      {
        next: (data) =>
        {
          this.categories = data
        }
      }
    )
    this.salesItemInput.inventoryItems = []
    this.salesItemInput.category = new InventoryItemCategory_DTO()
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
    const item = new InventoryItem_DTO(JSON.parse(event.item.element.nativeElement.querySelector("input").value))
    const existingItemIndex = this.salesItemInventoryInput.findIndex(x => x.id == item.id)
    if(existingItemIndex >= 0)
    {
      this.salesItemInput.inventoryItems![existingItemIndex].quantity += 1
    }
    else
    {
      console.log(this.salesItemInput)
    }
  }
  removeItem(id: number)
  {
    const i = this.salesItemInventoryInput.findIndex(x => x.id == id)
    if(i != undefined && i > -1)
      this.salesItemInput.inventoryItems?.splice(i, 1);
  }

  addOrUpdateItem()
  {
    console.log(this.salesItemInput)
    //this.addItem(this.salesItemInput)
  }

  addItem(item: SalesItem_DTO)
  {
    const sub = this.salesService.addNewSalesItem(item).subscribe(
    {
      next: (data) =>
      {
        console.log(data)
      }
    })
  }

  updateItem(item: SalesItem_DTO)
  {

  }

  resetItem()
  {

  }

  setTypes(category: InventoryItemCategory_DTO)
  {
    this.types = category.types ?? []
    this.salesItemInput.get('type').enable()
  }

  setSubTypes(type: InventoryItemType_DTO)
  {
    this.subTypes = type.subTypes ?? []
    this.salesItemInput.get('subType').enable()
  }
}
