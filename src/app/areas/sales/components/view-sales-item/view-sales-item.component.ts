import { Component, Input } from '@angular/core';
import { SalesItem_DTO } from 'src/app/shared/api/api.models';
import { SalesService } from '../../sales.service';

@Component({
  selector: 'app-view-sales-item',
  templateUrl: './view-sales-item.component.html',
  styleUrls: ['./view-sales-item.component.scss']
})
export class ViewSalesItemComponent {

  @Input() itemInput: SalesItem_DTO = new SalesItem_DTO()
  item: SalesItem_DTO = new SalesItem_DTO()

  constructor(private salesService: SalesService)
  {
    this.item = JSON.parse(JSON.stringify(this.itemInput))
  }

  removeItem(id: number)
  {
    const i = this.itemInput.inventoryItems?.findIndex(x => x.inventoryItem?.id == id)
    if(i != undefined && i > -1)
      this.itemInput.inventoryItems?.splice(i, 1);
  }

  addOrUpdateItem()
  {
    this.addItem(this.itemInput)
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
}
