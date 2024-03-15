import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { AddressType_DTO, PhysicalAddress_DTO, User_DTO } from 'src/app/shared/api/api.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhoneNumberToFormattedStringPipe } from 'src/app/shared/pipes/phone-number-to-formatted-string.pipe';
import { StringToPhoneNumberPipe } from 'src/app/shared/pipes/string-to-phone-number.pipe';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  config = new MatDialogConfig()
  id = 0
  user: User_DTO = new User_DTO()

  mailingAddress: PhysicalAddress_DTO | undefined
  billingAddress:  PhysicalAddress_DTO | undefined
  shippingAddress: PhysicalAddress_DTO | undefined

  nameForm = new FormGroup({
    prefix: new FormControl(""),
    firstName: new FormControl("",[
      Validators.required
      ]),
    middleName: new FormControl(""),
    lastName: new FormControl("",[
      Validators.required
      ]),
    suffix: new FormControl("")
  })

  emailForm = new FormGroup({
    primary: new FormControl("",[
      Validators.required,
      Validators.email
      ]),
    secondary: new FormControl("",[
      Validators.email
      ]),
  })

  phoneNumberForm = new FormGroup({
    // phone1: new FormControl("",[
    //   Validators.minLength(10),
    //   Validators.maxLength(10)
    //   ]),
    // phone2: new FormControl("",[
    //   Validators.minLength(10),
    //   Validators.maxLength(10)
    //   ]),
    // phone3: new FormControl("",[
    //   Validators.minLength(10),
    //   Validators.maxLength(10)
    //   ]),
  })

  constructor(private route:ActivatedRoute,
              private api: UsersService,
              private alertService: AlertService,
              private notificationService: NotificationService,
              private appStateService: AppStateService,
              private phoneToString: PhoneNumberToFormattedStringPipe,
              private stringToPhone: StringToPhoneNumberPipe,)
    {
    this.id = Number(this.route.snapshot.paramMap.get('id')) || 0;
    if(this.id != 0)
    {
      this.appStateService.openSpinner("Fetching User Data",);
      this.api.getUser(this.id).subscribe(
        {
          next: (data) =>
          {
            this.user = data
            this.setForms();
          },
          error: (error) =>
          {
          },
          complete: () =>
          {
            this.appStateService.closeSpinner()
          },
        })
    }
  }

  setForms()
  {
    this.setNameFormWithCurrentUser()
    this.setEmailAddressFromWithCurrentUser()
    this.setPhoneNumberFormWithCurrentUser()
    this.setAddressesWithCurrentUser()
    }

  setNameFormWithCurrentUser()
  {
    // this.nameForm.controls['prefix'].setValue(this.user.contact?.prefix ?? null)
    // this.nameForm.controls['firstName'].setValue(this.user.contact?.firstName ?? null)
    // this.nameForm.controls['middleName'].setValue(this.user.contact?.middleName ?? null)
    // this.nameForm.controls['lastName'].setValue(this.user.contact?.lastName ?? null)
    // this.nameForm.controls['suffix'].setValue(this.user.contact?.suffix ?? null)
  }

  setPhoneNumberFormWithCurrentUser()
  {
    // if(this.user?.contact?.contactInformation?.phoneNumbers != null)
    // {
    //   let i = 1
    //   this.user?.contact?.contactInformation?.phoneNumbers.forEach((info) => {
    //     console.log(info)
    //     this.phoneNumberForm.addControl(info.priority.toString(), new FormControl(this.phoneToString.transform(info)))
    //   })
    // }
  }

  setEmailAddressFromWithCurrentUser()
  {
    // if(this.user.contact?.contactInformation?.emailAddresses != undefined)
    // {
    //   let primary = this.user.contact?.contactInformation?.emailAddresses.filter(x => x.priority == 1)[0]

    //   this.emailForm.controls['primary'].setValue(primary.address)
    // }
  }

  setAddressesWithCurrentUser()
  {
    // if(this.user.contact?.contactInformation?.physicalAddresses != undefined)
    // {
    //   let mailing = this.user.contact?.contactInformation?.physicalAddresses.filter(x => x.addressType == AddressType.Mailing)[0]
    //   this.mailingAddress = mailing

    //   let billing = this.user.contact?.contactInformation?.physicalAddresses.filter(x => x.addressType == AddressType.Billing)[0]
    //   this.billingAddress = billing

    //   let shipping = this.user.contact?.contactInformation?.physicalAddresses.filter(x => x.addressType == AddressType.Shipping)[0]
    //   this.shippingAddress = shipping
    // }
  }

  updateUserWithNameFormValues(user: User_DTO)
  {
    // this.nameForm.value.prefix != null || this.nameForm.value.firstName != undefined ?
    //   user.contact!.prefix = this.nameForm.value.prefix ?? undefined : null

    // this.nameForm.value.firstName != null || this.nameForm.value.firstName != undefined ?
    //   user.contact!.firstName = this.nameForm.value.firstName : null

    // user.contact!.middleName = this.nameForm.value.middleName ?? undefined

    // this.nameForm.value.lastName != null || this.nameForm.value.lastName != undefined ?
    //   user.contact!.lastName = this.nameForm.value.lastName : null
  }

  updateUserWithEmailFormValues(user: User_DTO)
  {
    // this.emailForm.value.primary != null || this.emailForm.value.primary != undefined ?
    //   user.primaryEmail!.address = this.emailForm.value.primary : null

    // this.emailForm.value.secondary != null || this.emailForm.value.secondary != undefined ?
    //   user.secondaryEmail!.address = this.emailForm.value.secondary : null
  }

  updateUserWithPhoneNumberFormValues(user: User_DTO)
  {
    // this.phoneNumberForm.value.phone1 != null || this.phoneNumberForm.value.phone1 != undefined ?
    //  user.phoneNumber1 = this.stringToPhone.transform(this.phoneNumberForm.value.phone1) : null

    // this.phoneNumberForm.value.phone2 != null || this.phoneNumberForm.value.phone1 != undefined ?
    //   user.phoneNumber2 = this.stringToPhone.transform(this.phoneNumberForm.value.phone2 ?? "") : null

    // this.phoneNumberForm.value.phone3 != null || this.phoneNumberForm.value.phone1 != undefined ?
    //   user.phoneNumber3 = this.stringToPhone.transform(this.phoneNumberForm.value.phone3 ?? "") : null
  }

  getAddressUpdates(user: User_DTO)
  {
    // this.mailingAddress != undefined && Object.keys(this.mailingAddress).length > 0 ?
    //   user.mailingAddress = this.mailingAddress : undefined

    // this.billingAddress != undefined && Object.keys(this.billingAddress).length > 0 ?
    //   user.billingAddress = this.billingAddress : undefined

    // this.shippingAddress != undefined && Object.keys(this.shippingAddress).length > 0 ?
    //   user.shippingAddress = this.shippingAddress : undefined
  }

  updateUser()
  {
    this.appStateService.openSpinner("Updating Profile")
    let userUpdate = this.user

    this.updateUserWithNameFormValues(userUpdate)
    this.updateUserWithEmailFormValues(userUpdate)
    this.updateUserWithPhoneNumberFormValues(userUpdate)
    this.getAddressUpdates(userUpdate)

    this.api.updateUser(userUpdate).subscribe(
      {
        next: (data) =>
        {
          this.user = data
          this.setForms()
          let message = new Message(MessageType.Success)
          message.text = "Profile Updated"
          this.alertService.sendAlert(message)
        },
        error: (error) =>
        {
        },
        complete: () =>
        {
          this.appStateService.closeSpinner()
        }
      })
  }

  receiveNewMailingAddress(event: any)
  {
    console.log(event)
    this.mailingAddress = event
  }

  receiveNewBillingAddress(event: any)
  {
    console.log(event)
    this.billingAddress = event
  }

  receiveNewShippingAddress(event: any)
  {
    console.log(event)
    this.shippingAddress = event
  }

  addNewAddress(name:string)
  {
    if(name == "mailing")
    {
      this.mailingAddress = new PhysicalAddress_DTO()
    }
    else if (name == "billing")
    {
      this.billingAddress = new PhysicalAddress_DTO()
    }
    else if(name == "shipping")
    {
      this.shippingAddress = new PhysicalAddress_DTO()
    }
  }
}
