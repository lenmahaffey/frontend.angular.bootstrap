import { Component, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { StringToPhoneNumberPipe } from 'src/app/shared/pipes/string-to-phone-number.pipe';
import { PhoneNumberToFormattedStringPipe } from 'src/app/shared/pipes/phone-number-to-formatted-string.pipe';
import { StringToFormattedPhoneNumberStringPipe } from 'src/app/shared/pipes/string-to-formatted-phone-number-string.pipe';
import { DialogConfig } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-phone-number-modal',
  templateUrl: './add-phone-number-modal.component.html',
  styleUrls: ['./add-phone-number-modal.component.scss']
})
export class AddPhoneNumberModalComponent {
  title: string | undefined
  currentNumber: PhoneNumber_DTO
  phoneNumberInput: any
  @Output() response: Subject<PhoneNumber_DTO | undefined> = new Subject()
  get number() {
    return this.phoneNumberInput.get('number')
  }
  get label(){
    return this.phoneNumberInput.get('label')
  }
  constructor(private phonePipe: PhoneNumberToFormattedStringPipe, private stringToPhoneNumber: StringToPhoneNumberPipe,@Inject(MAT_DIALOG_DATA) public data: any)
  {
    let dto = data['dto']
    if(dto == undefined)
    {
      dto = new PhoneNumber_DTO()
      dto.label = ""
      dto.areaCode = ""
      dto.prefix = ""
      dto.localNumber = ""
    }

    this.currentNumber = data
    this.phoneNumberInput = new FormGroup(
      {
        label: new FormControl(dto.label ?? "",
        [
          Validators.required,
          Validators.maxLength(10),
        ]),
        number: new FormControl(phonePipe.transform(dto),
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
      let newNumber = this.stringToPhoneNumber.transform(response.value.number)
      newNumber.label = this.phoneNumberInput.value.label
      this.response.next(response)
    }
    this.response.complete()
  }
}
