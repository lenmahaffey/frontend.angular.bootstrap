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
  constructor(
    private stringPipe: StringToFormattedPhoneNumberStringPipe,
    private phonePipe: PhoneNumberToFormattedStringPipe,
    private stringToPhoneNumber: StringToPhoneNumberPipe,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    let dto = data['dto']
    if(dto == undefined)
    {
      dto = new PhoneNumber_DTO()
      dto.id = 0
      dto.contactInformationId = 0
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
        number: new FormControl(dto.areaCode != "" ? phonePipe.transform(dto) : "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("^[0-9-\(\) ]*$")
        ])
      }
    )
  }
  // inputChanged(input:any)
  // {
  //   let s = this.stringToPhoneNumber.transform(input)
  //   let formattedString = this.stringPipe.transform(input)
  //   this.phoneNumberInput.patchValue(
  //     {
  //       number: formattedString
  //     }
  //   )
  // }
  sendResponse(response: any)
  {
    if(response == undefined)
    {
      this.response.next(undefined)
    }
    else
    {
      let newNumber = this.stringToPhoneNumber.transform(response.number)
      newNumber.label = this.phoneNumberInput.value.label
      newNumber.id = this.currentNumber.id != undefined ? this.currentNumber.id : 0
      newNumber.contactInfoId = this.currentNumber.contactInfoId
      newNumber.contactInformation = undefined
      this.response.next(newNumber)
    }
    this.response.complete()
  }
}
