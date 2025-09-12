import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { InventoryItemType_DTO } from 'src/app/shared/api/api.models';

@Component({
    selector: 'app-add-new-sub-type',
    templateUrl: './add-new-sub-type.component.html',
    styleUrls: ['./add-new-sub-type.component.scss'],
    standalone: false
})
export class AddNewSubTypeComponent {

  selectedType: InventoryItemType_DTO | undefined
  newCategoryForm:FormGroup =  new FormGroup({
    name: new FormControl("",[
      Validators.required
      ]),
  })
  nameOutput: Subject<string> = new Subject<string>();

  constructor(@Inject(MAT_DIALOG_DATA) private data: InventoryItemType_DTO)
  {
    this.selectedType = data
  }

  addNewSubType()
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
