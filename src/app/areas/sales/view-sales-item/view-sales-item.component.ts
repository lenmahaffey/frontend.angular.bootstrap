import { ChangeDetectorRef, Component } from '@angular/core';
import { InventoryItem_DTO, SalesItem_DTO } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-view-sales-item',
  templateUrl: './view-sales-item.component.html',
  styleUrls: ['./view-sales-item.component.scss']
})
export class ViewSalesItemComponent {
  item: SalesItem_DTO = new SalesItem_DTO()
  itemList: InventoryItem_DTO[] = []

  constructor()
  {
    if(this.item.inventoryItems != undefined)
    {
      this.itemList = this.item.inventoryItems
    }
  }
}
