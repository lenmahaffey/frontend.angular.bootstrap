import { Component, OnDestroy } from '@angular/core';
import { InventoryService } from 'src/app/areas/inventory/inventory.service';
import { InventoryItemCategory_DTO, InventoryItemType_DTO, InventoryItemSubType_DTO, SalesItem_DTO, InventoryItem_DTO, InventorySalesItem_DTO } from 'src/app/shared/api/api.models';
import { SalesService } from '../../sales.service';
import { FormControl, FormGroup } from '@angular/forms';

interface InventoryNode{
  item: InventoryItem_DTO
  quantity: number
  price: number
}

@Component({
  selector: 'app-create-sales-item',
  templateUrl: './create-sales-item.component.html',
  styleUrls: ['./create-sales-item.component.scss']
})

export class CreateSalesItemComponent {
  salesItemInput: any
  inventoryItems: InventoryNode[] = []
  inventoryMap = new Map<number, number>()
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
    const index = this.inventoryItems.findIndex(x => x.item.id == item.id)
    if(index >= 0)
    {
      this.inventoryItems.find(x => x.item.id == item.id)!.quantity += 1
    }
    else
    {
      const node = {item: item, quantity: 1, price: item.dailyRentalRate * 1}
      this.inventoryItems.push(node)
    }
  }
  removeItem(id: number)
  {
    const i = this.inventoryItems.findIndex(x => x.item.id == id)
    if(i != undefined && i > -1)
      this.salesItemInput.inventoryItems?.splice(i, 1);
  }

  addOrUpdateItem()
  {
    // const model = new CreateNewInventorySalesItemViewModel()
    // model.categoryId = this.salesItemInput.get('category').value.id
    // model.typeId = this.salesItemInput.get('type').value.id
    // model.subTypeId = this.salesItemInput.get('subType').value.id
    // model.name = this.salesItemInput.get('name').value
    // model.description = this.salesItemInput.get('description').value
    // model.inventoryItemQuantities = {}
    // this.inventoryItems.forEach(x =>
    // {
    //   model.inventoryItemQuantities[x.item.id.toString()] = x.quantity
    // })
    // this.addItem(model)
  }

  // addItem(model: CreateNewInventorySalesItemViewModel)
  // {
  //   const sub = this.salesService.addNewSalesItem(model).subscribe(
  //   {
  //     next: (data) =>
  //     {
  //       console.log(data)
  //     }
  //   })
  // }

  // updateItem(item: SalesItem_DTO)
  // {

  // }

  // resetItem()
  // {

  // }

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

  getQuantity(item: InventoryItem_DTO) : number
  {
    return this.inventoryItems.find(x => x.item === item)?.quantity ?? 1
  }

  setQuantity(item: InventoryItem_DTO)
  {
    this.inventoryItems.find(x => x.item === item)!.quantity += 1
  }
}
