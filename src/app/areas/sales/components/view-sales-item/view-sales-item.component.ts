import { Component, Input } from '@angular/core';
import { SalesItem_DTO } from 'src/app/shared/api/api.models';
import { SalesService } from '../../sales.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-sales-item',
  templateUrl: './view-sales-item.component.html',
  styleUrls: ['./view-sales-item.component.scss']
})
export class ViewSalesItemComponent {

  @Input() item: SalesItem_DTO = new SalesItem_DTO()

  removeItem(id: number)
  {
    const i = this.item.inventoryItems?.findIndex(x => x.inventoryItem.id == id)
    if(i != undefined)
      this.item.inventoryItems?.splice(i);
  }
}
