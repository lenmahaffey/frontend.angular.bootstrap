import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { InventoryItemCategory_DTO } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-add-new-type',
  templateUrl: './add-new-type.component.html',
  styleUrls: ['./add-new-type.component.scss']
})
export class AddNewTypeComponent {

  selectedCategory: InventoryItemCategory_DTO | undefined
  newCategoryForm:FormGroup =  new FormGroup({
    name: new FormControl("",[
      Validators.required
      ]),
  })
  nameOutput: Subject<string> = new Subject<string>();
  constructor(@Inject(MAT_DIALOG_DATA) private data: InventoryItemCategory_DTO)
  {
    this.selectedCategory = data
  }

  addNewType()
  {
    let value: string = this.newCategoryForm.value.name
    value = value.trim()
    if (value != undefined && value != "")
    {
      this.nameOutput.next(this.newCategoryForm.value.name)
      this.nameOutput.complete();
    }
  }
}
