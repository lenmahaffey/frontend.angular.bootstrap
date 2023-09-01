import { Component } from '@angular/core';
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

  // mailingAddressUpdate: PhysicalAddress | undefined
  // billingAddressUpdate:  PhysicalAddress | undefined
  // shippingAddressUpdate:  PhysicalAddress | undefined

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
    let data = this.user
    this.nameForm.controls['prefix'].setValue(data.prefix ?? null)
    this.nameForm.controls['firstName'].setValue(data.firstName ?? null)
    this.nameForm.controls['middleName'].setValue(data.middleName ?? null)
    this.nameForm.controls['lastName'].setValue(data.lastName ?? null)
    this.nameForm.controls['suffix'].setValue(data.suffix ?? null)

    data.mailingAddress != null || data.mailingAddress != undefined ?
      this.mailingAddress = data.mailingAddress : this.mailingAddress = undefined

    data.shippingAddress != null || data.shippingAddress != undefined ?
      this.shippingAddress = data.shippingAddress : this.shippingAddress = undefined

    data.billingAddress != null || data.billingAddress != undefined ?
      this.billingAddress = data.billingAddress : this.billingAddress = undefined

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
    this.config.data.message = "Updateing Profile"
    this.appStateService.openSpinner(this.config)
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

    this.mailingAddress != undefined ?
       userUpdate.mailingAddress = this.mailingAddress : null

    this.billingAddress != undefined ?
      userUpdate.billingAddress = this.billingAddress : null

    this.shippingAddress != undefined ?
      userUpdate.shippingAddress = this.shippingAddress : null

    this.phoneNumberForm.value.phone1 != null || this.phoneNumberForm.value.phone1 != undefined ?
     userUpdate.phoneNumber1 = this.stringToPhone.transform(this.phoneNumberForm.value.phone1) : null

    this.phoneNumberForm.value.phone2 != null || this.phoneNumberForm.value.phone1 != undefined ?
      userUpdate.phoneNumber2 = this.stringToPhone.transform(this.phoneNumberForm.value.phone2 ?? "") : null

    this.phoneNumberForm.value.phone3 != null || this.phoneNumberForm.value.phone1 != undefined ?
      userUpdate.phoneNumber3 = this.stringToPhone.transform(this.phoneNumberForm.value.phone3 ?? "") : null

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
    this.mailingAddress = event
  }

  receiveNewBillingAddress(event: any)
  {
    this.billingAddress = event
  }

  receiveNewShippingAddress(event: any)
  {
    this.shippingAddress = event
  }
}
