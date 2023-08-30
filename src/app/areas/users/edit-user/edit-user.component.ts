import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { PhoneNumber, PhysicalAddress, User } from 'src/app/shared/api/api.models';
import { FormControl, FormGroup } from '@angular/forms';
import { PhoneNumberToFormattedStringPipe } from 'src/app/shared/pipes/phone-number-to-formatted-string.pipe';
import { FormattedStringToPhoneNumberPipe } from 'src/app/shared/pipes/formatted-string-to-phone-number.pipe';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  id = 0
  user: User = new User()
  mailingAddress = new PhysicalAddress()
  billingAddress = new PhysicalAddress()
  shippingAddress = new PhysicalAddress()

  mailingAddressUpdate: PhysicalAddress | undefined
  billingAddressUpdate:  PhysicalAddress | undefined
  shippingAddressUpdate:  PhysicalAddress | undefined

  nameForm = new FormGroup({
    prefix: new FormControl(""),
    firstName: new FormControl(""),
    middleName: new FormControl(""),
    lastName: new FormControl(""),
    suffix: new FormControl("")
  })

  emailForm = new FormGroup({
    primary: new FormControl(""),
    secondary: new FormControl(""),
  })

  phoneNumberForm = new FormGroup({
    phone1: new FormControl(""),
    phone2: new FormControl(""),
    phone3: new FormControl(""),
  })

  constructor(private route:ActivatedRoute,
              private api: UsersService,
              private phoneToString: PhoneNumberToFormattedStringPipe,
              private stringToPhone: FormattedStringToPhoneNumberPipe,) {
    this.id = Number(this.route.snapshot.paramMap.get('id')) || 0;
    if(this.id != 0)
    {
      this.api.getUser(this.id).subscribe(data =>
        {
          this.user = data
          this.setForms();
        })
    }
  }

  setForms()
  {
    let data = this.user
    this.nameForm.controls['prefix'].setValue(data.prefix ?? null)
    this.nameForm.controls['firstName'].setValue(data.firstName ?? null)
    this.nameForm.controls['middleName'].setValue(data.middleName ?? null)
    this.nameForm.controls['lastName'].setValue(data.lastName ?? null)
    this.nameForm.controls['suffix'].setValue(data.suffix ?? null)

    data.mailingAddress != null || data.mailingAddress != undefined ?
    this.mailingAddress = data.mailingAddress : this.mailingAddress =new PhysicalAddress()

    data.shippingAddress != null || data.shippingAddress != undefined ?
    this.shippingAddress = data.shippingAddress : this.shippingAddress = new PhysicalAddress()

    data.billingAddress != null || data.billingAddress != undefined ?
    this.billingAddress = data.billingAddress : this.billingAddress = new PhysicalAddress()

    this.emailForm.controls['primary'].setValue(data.primaryEmail?.address ?? null)
    this.emailForm.controls['secondary'].setValue(data.secondaryEmail?.address ?? null)

    data.phoneNumber1 != null || data.phoneNumber1 != undefined ?
    this.phoneNumberForm.controls['phone1'].setValue(this.phoneToString.transform(data.phoneNumber1)) : this.phoneNumberForm.controls['phone1'].setValue("")

    data.phoneNumber2 != null || data.phoneNumber2 != undefined ?
    this.phoneNumberForm.controls['phone2'].setValue(this.phoneToString.transform(data.phoneNumber2)) : this.phoneNumberForm.controls['phone2'].setValue("")

    data.phoneNumber3 != null || data.phoneNumber3 != undefined ?
    this.phoneNumberForm.controls['phone3'].setValue(this.phoneToString.transform(data.phoneNumber3)) : this.phoneNumberForm.controls['phone3'].setValue("")
  }

  updateUser()
  {
    let userUpdate = this.user
    this.nameForm.value.prefix != null || this.nameForm.value.firstName != undefined ?
      userUpdate.prefix = this.nameForm.value.prefix ?? undefined : null

    this.nameForm.value.firstName != null || this.nameForm.value.firstName != undefined ?
      userUpdate.firstName = this.nameForm.value.firstName : null

    userUpdate.middleName = this.nameForm.value.middleName ?? undefined

    this.nameForm.value.lastName != null || this.nameForm.value.lastName != undefined ?
      userUpdate.lastName = this.nameForm.value.lastName : null

    userUpdate.suffix = this.nameForm.value.suffix ?? undefined

    this.emailForm.value.primary != null || this.emailForm.value.primary != undefined ?
      userUpdate.primaryEmail!.address = this.emailForm.value.primary : null

    this.emailForm.value.secondary != null || this.emailForm.value.secondary != undefined ?
      userUpdate.secondaryEmail!.address = this.emailForm.value.secondary : null

    this.mailingAddressUpdate != undefined ? userUpdate.mailingAddress = this.mailingAddressUpdate : null
    this.billingAddressUpdate != undefined ? userUpdate.billingAddress = this.billingAddressUpdate : null
    this.shippingAddressUpdate != undefined ? userUpdate.shippingAddress = this.shippingAddressUpdate : null

    this.phoneNumberForm.value.phone1 != null || this.phoneNumberForm.value.phone1 != undefined ?
     userUpdate.phoneNumber1 = this.stringToPhone.transform(this.phoneNumberForm.value.phone1) : null

    this.phoneNumberForm.value.phone2 != null || this.phoneNumberForm.value.phone1 != undefined ?
      userUpdate.phoneNumber2 = this.stringToPhone.transform(this.phoneNumberForm.value.phone2 ?? "") : null

    this.phoneNumberForm.value.phone3 != null || this.phoneNumberForm.value.phone1 != undefined ?
      userUpdate.phoneNumber3 = this.stringToPhone.transform(this.phoneNumberForm.value.phone3 ?? "") : null
    this.api.updateUser(userUpdate).subscribe(data =>{
      console.log(data)
      this.user = data
      this.setForms()
    })
  }

  receiveNewMailingAddress(event: any)
  {
    this.mailingAddressUpdate = event
  }

  receiveNewBillingAddress(event: any)
  {
    this.billingAddressUpdate = event
  }

  receiveNewShippingAddress(event: any)
  {
    this.shippingAddressUpdate = event
  }
}
