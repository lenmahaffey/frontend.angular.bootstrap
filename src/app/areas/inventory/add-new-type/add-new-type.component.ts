import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-new-type',
  templateUrl: './add-new-type.component.html',
  styleUrls: ['./add-new-type.component.scss']
})
export class AddNewTypeComponent {
  newCategoryForm:FormGroup =  new FormGroup({
    name: new FormControl("",[
      Validators.required
      ]),
  })
  nameOutput: Subject<string> = new Subject<string>();
}
