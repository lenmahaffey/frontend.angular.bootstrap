import { Component, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { StringToPhoneNumberPipe } from 'src/app/shared/pipes/string-to-phone-number.pipe';
import { PhoneNumberToFormattedStringPipe } from 'src/app/shared/pipes/phone-number-to-formatted-string.pipe';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-phone-number',
  templateUrl: './add-or-edit-phone-number.component.html',
  styleUrls: ['./add-or-edit-phone-number.component.scss']
})
export class AddOrEditPhoneNumberComponent {

  @Input() currentNumber: PhoneNumber_DTO
  phoneNumberInput: any
  @Output() response: Subject<PhoneNumber_DTO | undefined> = new Subject()

  get number() {
    return this.phoneNumberInput.get('number')
  }
  get label(){
    return this.phoneNumberInput.get('label')
  }

  constructor(
    private phonePipe: PhoneNumberToFormattedStringPipe,
    private stringToPhoneNumber: StringToPhoneNumberPipe,
    @Inject(MAT_DIALOG_DATA) data: PhoneNumber_DTO)
  {
    let dto = data
    if(dto == undefined)
    {
      dto = new PhoneNumber_DTO()
      dto.id = 0
      dto.contactId = 0
      dto.label = ""
      dto.areaCode = ""
      dto.prefix = ""
      dto.localNumber = ""
    }
    this.currentNumber = dto
    this.phoneNumberInput = new FormGroup(
      {
        label: new FormControl(dto.label,
        [
          Validators.required,
          Validators.maxLength(10),
        ]),
        number: new FormControl(dto.areaCode != "" ? this.phonePipe.transform(dto) : "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("^[0-9-\(\) ]*$")
        ])
      }
    )
  }

  sendResponse(response: any)
  {
    if(response == undefined)
    {
      this.response.next(undefined)
    }
    else
    {
      const newNumber = this.stringToPhoneNumber.transform(response.number)
      newNumber.label = this.phoneNumberInput.value.label
      newNumber.id =  this.currentNumber.id
      newNumber.contactId = this.currentNumber.contactId
      this.response.next(newNumber)
    }
    this.response.complete()
  }
}
