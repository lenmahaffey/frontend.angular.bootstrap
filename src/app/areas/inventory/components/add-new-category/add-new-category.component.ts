import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-add-new-category',
    templateUrl: './add-new-category.component.html',
    styleUrls: ['./add-new-category.component.scss'],
    standalone: false
})
export class AddNewCategoryComponent {

  newCategoryForm:FormGroup =  new FormGroup({
    name: new FormControl("",[
      Validators.required
      ]),
  })
  nameOutput: Subject<string> = new Subject<string>();

  addNewCategory()
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
