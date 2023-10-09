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
  constructor(private service: SalesService)
  {
    if(this.item.id > 0)
    {
      this.getItem(this.item.id)
    }
  }

  saveItem()
  {
    if(this.item.id === 0 )
    {
      this.addNewItem()
    }
    else{
      this.updateItem()
    }
  }
  getItem(id: number)
  {
    this.service.GetSalesItem(id).subscribe(
      {
        next: (data) =>
        {
          console.log(data)
        }
      }
    )
  }

  addNewItem()
  {
    this.service.addNewSalesItem(this.item).subscribe(
      {
        next: (data) =>
        {
          console.log(data)
        }
      }
    )
  }
  updateItem()
  {
    this.service.updateInventoryItem(this.item).subscribe(
      {
        next: (data) =>
        {
          console.log(data)
        }
      }
    )
  }
}
