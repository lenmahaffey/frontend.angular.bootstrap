import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-new-sub-type',
  templateUrl: './add-new-sub-type.component.html',
  styleUrls: ['./add-new-sub-type.component.scss']
})
export class AddNewSubTypeComponent {
  newCategoryForm:FormGroup =  new FormGroup({
    name: new FormControl("",[
      Validators.required
      ]),
  })
  nameOutput: Subject<string> = new Subject<string>();
}
