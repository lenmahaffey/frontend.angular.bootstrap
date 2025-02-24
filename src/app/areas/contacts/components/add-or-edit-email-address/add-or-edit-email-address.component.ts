import { Component, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { EmailAddress_DTO } from 'src/app/shared/api/api.models';

@Component({
    selector: 'app-add-email-address',
    templateUrl: './add-or-edit-email-address.component.html',
    styleUrls: ['./add-or-edit-email-address.component.scss'],
    standalone: false
})
export class AddOrEditEmailAddressComponent {
  addressFormGroup: any
  @Input() address: EmailAddress_DTO
  @Output() response: Subject<EmailAddress_DTO | undefined> = new Subject()

  get addressInput() {
    return this.addressFormGroup.get('address')
  }
  get labelInput(){
    return this.addressFormGroup.get('label')
  }

  constructor(@Inject(MAT_DIALOG_DATA) data: EmailAddress_DTO)
  {
    let dto = data
    if(dto == undefined)
    {
      dto = new EmailAddress_DTO()
      dto.id = 0
    }
    this.address = dto
    this.addressFormGroup = new FormGroup(
      {
        address: new FormControl(dto.address,
          [
            Validators.required,
            Validators.maxLength(99),
            Validators.email
          ]
        ),
        label: new FormControl(dto.label,
          [
            Validators.required,
            Validators.maxLength(25),
          ])
      }
    )
  }

  onSubmit(input: any | undefined)
  {
    if(input == undefined)
    {
      this.response.next(undefined)
      this.response.complete()
      return
    }
    const dto = new EmailAddress_DTO(this.address)
    dto.address = this.addressFormGroup.value.address
    dto.label = this.addressFormGroup.value.label
    this.response.next(dto)
    this.response.complete()
  }
}
