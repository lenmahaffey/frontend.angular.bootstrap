import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { PhysicalAddress, User } from 'src/app/shared/api/api.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhoneNumberToFormattedStringPipe } from 'src/app/shared/pipes/phone-number-to-formatted-string.pipe';
import { FormattedStringToPhoneNumberPipe } from 'src/app/shared/pipes/formatted-string-to-phone-number.pipe';
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
  user: User = new User()

  mailingAddress: PhysicalAddress | undefined
  billingAddress:  PhysicalAddress | undefined
  shippingAddress: PhysicalAddress | undefined

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
    phone1: new FormControl("",[
      Validators.minLength(10),
      Validators.maxLength(10)
      ]),
    phone2: new FormControl("",[
      Validators.minLength(10),
      Validators.maxLength(10)
      ]),
    phone3: new FormControl("",[
      Validators.minLength(10),
      Validators.maxLength(10)
      ]),
  })

  constructor(private route:ActivatedRoute,
              private api: UsersService,
              private alertService: AlertService,
              private notificationService: NotificationService,
              private appStateService: AppStateService,
              private phoneToString: PhoneNumberToFormattedStringPipe,
              private stringToPhone: FormattedStringToPhoneNumberPipe,)
    {
    this.id = Number(this.route.snapshot.paramMap.get('id')) || 0;
    this.config.data =
    {
      message: "Fetching User Data",
    }
    this.config.disableClose = true

    if(this.id != 0)
    {
      this.appStateService.openSpinner(this.config);
      this.api.getUser(this.id).subscribe(
        {
          next: (data) =>
          {
            this.user = data
            this.setForms();
          },
          error: (error) =>
          {
            let message = new Message(MessageType.Error);
            message.title = "Error!"
            message.text = error
            this.notificationService.sendNotification(message)
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
    this.nameForm.controls['prefix'].setValue(this.user.prefix ?? null)
    this.nameForm.controls['firstName'].setValue(this.user.firstName ?? null)
    this.nameForm.controls['middleName'].setValue(this.user.middleName ?? null)
    this.nameForm.controls['lastName'].setValue(this.user.lastName ?? null)
    this.nameForm.controls['suffix'].setValue(this.user.suffix ?? null)
  }

  setPhoneNumberFormWithCurrentUser()
  {
    this.user.phoneNumber1 != null || this.user.phoneNumber1 != undefined ?
    this.phoneNumberForm.controls['phone1'].setValue(this.phoneToString.transform(this.user.phoneNumber1)) : this.phoneNumberForm.controls['phone1'].setValue("")

    this.user.phoneNumber2 != null || this.user.phoneNumber2 != undefined ?
    this.phoneNumberForm.controls['phone2'].setValue(this.phoneToString.transform(this.user.phoneNumber2)) : this.phoneNumberForm.controls['phone2'].setValue("")

    this.user.phoneNumber3 != null || this.user.phoneNumber3 != undefined ?
    this.phoneNumberForm.controls['phone3'].setValue(this.phoneToString.transform(this.user.phoneNumber3)) : this.phoneNumberForm.controls['phone3'].setValue("")

  }

  setEmailAddressFromWithCurrentUser()
  {
    this.emailForm.controls['primary'].setValue(this.user.primaryEmail?.address ?? undefined)
    this.emailForm.controls['secondary'].setValue(this.user.secondaryEmail?.address ?? null)
  }

  setAddressesWithCurrentUser()
  {
    if(this.user.mailingAddress != undefined)
    {
      this.mailingAddress = this.user.mailingAddress
    }

    if(this.user.billingAddress != undefined)
    {
      this.billingAddress = this.user.billingAddress
    }

    if(this.user.shippingAddress != undefined)
    {
      this.shippingAddress = this.user.shippingAddress
    }
  }

  updateUserWithNameFormValues(user: User)
  {
    this.nameForm.value.prefix != null || this.nameForm.value.firstName != undefined ?
      user.prefix = this.nameForm.value.prefix ?? undefined : null

    this.nameForm.value.firstName != null || this.nameForm.value.firstName != undefined ?
      user.firstName = this.nameForm.value.firstName : null

    user.middleName = this.nameForm.value.middleName ?? undefined

    this.nameForm.value.lastName != null || this.nameForm.value.lastName != undefined ?
      user.lastName = this.nameForm.value.lastName : null
  }

  updateUserWithEmailFormValues(user: User)
  {
    this.emailForm.value.primary != null || this.emailForm.value.primary != undefined ?
      user.primaryEmail!.address = this.emailForm.value.primary : null

    this.emailForm.value.secondary != null || this.emailForm.value.secondary != undefined ?
      user.secondaryEmail!.address = this.emailForm.value.secondary : null
  }

  updateUserWithPhoneNumberFormValues(user: User)
  {
    this.phoneNumberForm.value.phone1 != null || this.phoneNumberForm.value.phone1 != undefined ?
     user.phoneNumber1 = this.stringToPhone.transform(this.phoneNumberForm.value.phone1) : null

    this.phoneNumberForm.value.phone2 != null || this.phoneNumberForm.value.phone1 != undefined ?
      user.phoneNumber2 = this.stringToPhone.transform(this.phoneNumberForm.value.phone2 ?? "") : null

    this.phoneNumberForm.value.phone3 != null || this.phoneNumberForm.value.phone1 != undefined ?
      user.phoneNumber3 = this.stringToPhone.transform(this.phoneNumberForm.value.phone3 ?? "") : null
  }

  getAddressUpdates(user: User)
  {
    this.mailingAddress != undefined && Object.keys(this.mailingAddress).length > 0 ?
      user.mailingAddress = this.mailingAddress : undefined

    this.billingAddress != undefined && Object.keys(this.billingAddress).length > 0 ?
      user.billingAddress = this.billingAddress : undefined

    this.shippingAddress != undefined && Object.keys(this.shippingAddress).length > 0 ?
      user.shippingAddress = this.shippingAddress : undefined
  }

  updateUser()
  {
    this.config.data.message = "Updateing Profile"
    this.appStateService.openSpinner(this.config)
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
          let message = new Message(MessageType.Error);
          message.title = "Error!"
          message.text = error
          this.notificationService.sendNotification(message)
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
      this.mailingAddress = new PhysicalAddress()
    }
    else if (name == "billing")
    {
      this.billingAddress = new PhysicalAddress()
    }
    else if(name == "shipping")
    {
      this.shippingAddress = new PhysicalAddress()
    }
  }
}
