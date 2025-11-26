import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AddressType_DTO, Contact_DTO, EmailAddress_DTO, PhoneNumber_DTO, PhysicalAddress_DTO } from 'src/app/shared/api/api.models';
import { AddOrEditPhoneNumberComponent } from '../add-or-edit-phone-number/add-or-edit-phone-number.component';
import { ContactService } from '../../contact.service';
import { PhoneNumberToFormattedStringPipe } from 'src/app/shared/pipes/phone-number-to-formatted-string.pipe';
import { AddOrEditEmailAddressComponent } from '../add-or-edit-email-address/add-or-edit-email-address.component';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';
import { take } from 'rxjs';
import { SpinnerOptions } from 'src/app/shared/spinner/SpinnerOptions';

@Component({
    selector: 'app-view-contact',
    templateUrl: './view-contact.component.html',
    styleUrls: ['./view-contact.component.scss'],
    standalone: false
})
export class ViewContactComponent implements OnChanges {
  contact: Contact_DTO = new Contact_DTO({
      id: 0,
      firstName: "",
      lastName: "",
      isBusiness: false,
      hasCompetitorContacts: false,
      hasCustomerContacts: false,
      hasManufacturerContacts: false,
      hasVenueContacts: false,
      hasVendorContacts: false,
      version: 1
    })
  @Input() contactInputId = 0
  @Output() updateContact: EventEmitter<boolean> = new EventEmitter()
  currentMailingAddress: PhysicalAddress_DTO = new PhysicalAddress_DTO()
  currentBillingAddress: PhysicalAddress_DTO = new PhysicalAddress_DTO()
  currentShippingAddress: PhysicalAddress_DTO = new PhysicalAddress_DTO()

  constructor(
    private service: ContactService,
    private phonePipe: PhoneNumberToFormattedStringPipe,
    private namePipe: ContactNamePipe,
    private appState: AppStateService)
  {}

  ngOnChanges(): void {
    this.getContact()
  }

  getContact(withSpinner = false)
  {
    if(withSpinner)
    {
      this.appState.openSpinner(new SpinnerOptions("Getting Contact"));
    }
    this.service.getContact(this.contactInputId, true)
      .pipe(take(1))
      .subscribe(
        {
          next: (data) =>
          {
            this.contact = data
            this.setAddressInputs()
          },
          error: () =>
          {
            const message = new Message()
            message.text = `There was an error getting the contact for Contact#: ${this.contactInputId}`
            this.appState.sendAlert(message)
          }
        })
  }

  // getContactInformation()
  // {
  //   this.service.getContactInformation(this.contactInputId)
  //     .pipe(take(1))
  //     .subscribe(
  //     {
  //       next: (data) =>
  //       {
  //         this.contactInformation = data
  //         this.setAddressInputs()
  //       },
  //       error: () =>
  //       {
  //         let message = new Message()
  //         message.text = `There was an error getting the contactInformation for Contact#: ${this.contactInputId}`
  //         this.appState.sendAlert(message)
  //       }
  //     })
  //     .add(() =>
  //     {
  //       this.appState.closeSpinner()
  //     })
  // }

  setAddressInputs()
  {
    this.currentMailingAddress = this.contact?.physicalAddresses?.find(x => x.addressType == AddressType_DTO.Mailing) ?? new PhysicalAddress_DTO
    this.currentBillingAddress = this.contact?.physicalAddresses?.find(x => x.addressType == AddressType_DTO.Billing) ?? new PhysicalAddress_DTO
    this.currentShippingAddress = this.contact?.physicalAddresses?.find(x => x.addressType == AddressType_DTO.Shipping) ?? new PhysicalAddress_DTO
    this.currentMailingAddress.addressType = AddressType_DTO.Mailing
    this.currentBillingAddress.addressType = AddressType_DTO.Billing
    this.currentShippingAddress.addressType = AddressType_DTO.Shipping
  }

  openAddOrEditPhoneNumberDialog(number?: PhoneNumber_DTO)
  {
    const dialogRef = this.appState.openDialog(AddOrEditPhoneNumberComponent, number);
    dialogRef.pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          if(data != undefined)
          {
            data.id == 0 ? this.addPhoneNumber(data) : this.updatePhoneNumber(data)
          }
          else{
            this.appState.closeDialog()
          }
        }
      })
  }

  openDeletePhoneNumberDialog(number: PhoneNumber_DTO)
  {
    const options = new ConfirmationDialogOptions()
    options.title = "Delete Phone Number"
    options.text = `Are you sure you want to delete ${this.phonePipe.transform(number!)}?`

    this.appState.openConfirmationDialog(options).pipe(take(1)).subscribe(
      {
        next: (response) =>
        {
          (response) ? this.deletePhoneNumber(number) : null
        }
      })
  }

  addPhoneNumber(number: PhoneNumber_DTO)
  {
    this.appState.openSpinner(new SpinnerOptions("Adding phone number"))
    number.contactId = this.contact?.id
    this.service.AddPhoneNumber(number).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          this.contact?.phoneNumbers?.push(data)
          const message = new Message(MessageType.Success)
          message.text =`${this.phonePipe.transform(number)} has been added to ${this.namePipe.transform(this.contact)}'s phone numbers.`
          this.appState.sendAlert(message)
        },
        error: () =>
        {
          const message = new Message()
          message.text = "There was an error and the phone number could not be added"
          this.appState.sendAlert(message)
        }
      })
    .add(() =>
    {
      this.appState.closeSpinner()
    })
  }

  updatePhoneNumber(number: PhoneNumber_DTO)
  {
    this.appState.openSpinner(new SpinnerOptions("Updating phone number"))
    this.service.UpdatePhoneNumber(number).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          const i = this.contact?.phoneNumbers?.indexOf(number)
          if (i != undefined)
          {
            this.contact?.phoneNumbers?.splice(i ,1)
          }
          this.contact?.phoneNumbers?.push(data)
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(this.contact)}'s phone numbers have been updated.`
          this.appState.sendAlert(message)
        },
        error: () =>
        {
          const message = new Message()
          message.text = "There was an error and the phone number could not be updated."
          this.appState.sendAlert(message)
        }
      })
    .add(() =>
    {
      this.appState.closeSpinner()
    })
  }

  deletePhoneNumber(number: PhoneNumber_DTO)
  {
    this.appState.openSpinner(new SpinnerOptions("Deleting phone number"))
    this.service.DeletePhoneNumber(number).pipe(take(1)).subscribe(
      {
        next: () =>
        {
          const i = this.contact?.phoneNumbers?.indexOf(number)
          if (i != undefined)
          {
            this.contact?.phoneNumbers?.splice(i ,1)
            const message = new Message(MessageType.Success, `${this.phonePipe.transform(number)} has been deleted.`)
            this.appState.sendAlert(message)
          }
        },
        error: () =>
        {
          const message = new Message()
          message.text =  "There was an error and the phone number could not be deleted"
          this.appState.sendAlert(message)
        }
      })
    .add(() =>
    {
      this.appState.closeSpinner()
    })
  }

  openAddOrEditEmailAddressDialog(address?:EmailAddress_DTO)
  {
    const dialogRef = this.appState.openDialog(AddOrEditEmailAddressComponent, address);
    dialogRef.pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          if(data != undefined)
          {
            data.id == 0 ? this.addEmailAddress(data) : this.updateEmailAddress(data)
          }
          else{
            this.appState.closeDialog()
          }
        }
      })
  }

  openDeleteEmailAddressDialog(address:EmailAddress_DTO | undefined)
  {
    const options = new ConfirmationDialogOptions()
    options.title = "Delete Email Address"
    options.text = `Are you sure you want to delete ${address?.address}?`

    this.appState.openConfirmationDialog(options).pipe(take(1)).subscribe(
      {
        next: (response) =>
        {
          response == true ? this.deleteEmailAddress(address!) : null
        }
      })
  }

  addEmailAddress(address:EmailAddress_DTO)
  {
    this.appState.openSpinner(new SpinnerOptions("Adding email address"))
    address.contactId = this.contact!.id!
    this.service.AddEmailAddress(address).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          this.contact?.emailAddresses?.push(data)
          const message = new Message(MessageType.Success)
          message.text =  `${address.address} has been added to ${this.namePipe.transform(this.contact)}.`
          this.appState.sendAlert(message)
        },
        error: () =>
        {
          const message = new Message(MessageType.Error)
          message.text = "There was an error and the email address could not be added"
          this.appState.sendAlert(message)
        }
      })
    .add(() =>
    {
      this.appState.closeSpinner()
    })
  }

  updateEmailAddress(address:EmailAddress_DTO)
  {
    this.appState.openSpinner(new SpinnerOptions("Updating email address"))
    this.service.UpdateEmailAddress(address).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          let index: number | undefined
          this.contact?.emailAddresses?.forEach((e, i) => {
            if (e.id == address.id)
            {
              index = i
            }
          })
          if (index != undefined)
          {
            this.contact?.emailAddresses?.splice(index)
          }
          this.contact?.emailAddresses?.push(data)
          const message = new Message(MessageType.Success)
          message.text = `${address.address} has been updated.`
          this.appState.sendAlert(message)
        },
        error: () =>
        {
          const message = new Message()
          message.text = "There was an error and the email address could not be updated"
          this.appState.sendAlert(message)
        }
      })
    .add(() =>
    {
      this.appState.closeSpinner()
    })
  }

  deleteEmailAddress(address:EmailAddress_DTO)
  {
    this.appState.openSpinner(new SpinnerOptions("Deleting email address"))
    this.service.DeleteEmailAddress(address).pipe(take(1)).subscribe(
      {
        next: () =>
        {
          let index: number | undefined
          this.contact?.emailAddresses?.forEach((e, i) => {
            if (e.id == address.id)
            {
              index = i
            }
          });
          if (index != undefined)
          {
            this.contact?.emailAddresses?.splice(index ,1)
          }
          const message = new Message(MessageType.Success)
          message.text = `${address.address} has been deleted.`
          this.appState.sendAlert(message)
        },
        error: () =>
        {
          const message = new Message()
          message.text = "There was an error and the email address could not be deleted"
          this.appState.sendAlert(message)
        }
      })
    .add(() =>
    {
      this.appState.closeSpinner()
    })
  }

  emitUpdatedContact()
  {
    this.updateContact.next(true)
  }
}
