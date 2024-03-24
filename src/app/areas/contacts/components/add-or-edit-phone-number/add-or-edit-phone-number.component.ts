import { Component, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { StringToPhoneNumberPipe } from 'src/app/shared/pipes/string-to-phone-number.pipe';
import { PhoneNumberToFormattedStringPipe } from 'src/app/shared/pipes/phone-number-to-formatted-string.pipe';
import { StringToFormattedPhoneNumberStringPipe } from 'src/app/shared/pipes/string-to-formatted-phone-number-string.pipe';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';

@Component({
  selector: 'app-add-phone-number-modal',
  templateUrl: './add-or-edit-phone-number.component.html',
  styleUrls: ['./add-or-edit-phone-number.component.scss']
})
export class AddOrEditPhoneNumberComponent {
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
    private dialogRef: MatDialogRef<AddOrEditPhoneNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {dto: PhoneNumber_DTO})
  {
    let dto = data.dto
    console.log(dto)
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

  ngOnInit(): void {
    const bodyRect = document.body.getBoundingClientRect();
    const config: MatDialogConfig = new MatDialogConfig();
    config.minWidth = 400
    config.position =
    {
      right: ((bodyRect.width / 2) - ( config.minWidth / 2) ).toString() + "px",
      top: '7%' }

    this.dialogRef.updatePosition(config.position)
    this.dialogRef.updateSize(`${config.minWidth.toString()}px`)
    this.dialogRef.disableClose = false;
  }
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
      newNumber.contactInformationId = this.currentNumber.contactInformationId
      this.response.next(newNumber)
    }
    this.response.complete()
  }
}
