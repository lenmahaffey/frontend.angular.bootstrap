import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactInformation_DTO, AddressType_DTO, Contact_DTO, EmailAddress_DTO, PhoneNumber_DTO, PhysicalAddress_DTO } from 'src/app/shared/api/api.models';
import { AddOrEditPhoneNumberComponent } from '../add-or-edit-phone-number/add-or-edit-phone-number.component';
import { ContactService } from '../../contact.service';
import { PhoneNumberToFormattedStringPipe } from 'src/app/shared/pipes/phone-number-to-formatted-string.pipe';
import { AddOrEditEmailAddressComponent } from '../add-or-edit-email-address/add-or-edit-email-address.component';
import { AddOrEditContactComponent } from '../add-or-edit-contact/add-or-edit-contact.component';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {

  contactInformation: ContactInformation_DTO = new ContactInformation_DTO()
  contact: Contact_DTO = new Contact_DTO(
    {
      id: 0,
      firstName: "",
      lastName: "",
      contactInformationId: 0,
      isBusiness: false,
      hasCompetitorContacts: false,
      hasCustomerContacts: false,
      hasManufacturerContacts: false,
      hasVenueContacts: false,
      hasVendorContacts: false,
      version: 1
    })
  private _contactInputId = 0

  @Input() get contactInputId() : number{
    return this._contactInputId;
  }
  set contactInputId(value: number){
    this._contactInputId = value
    this.getContact()
  }

  currentMailingAddress: PhysicalAddress_DTO = new PhysicalAddress_DTO()
  currentBillingAddress: PhysicalAddress_DTO = new PhysicalAddress_DTO()
  currentShippingAddress: PhysicalAddress_DTO = new PhysicalAddress_DTO()

  @Output() updatedContact: EventEmitter<Contact_DTO> = new EventEmitter()

  constructor(
    private service: ContactService,
    private phonePipe: PhoneNumberToFormattedStringPipe,
    private namePipe: ContactNamePipe,
    private appState: AppStateService)
  {}

  ngOnInit(): void {
    this.getContact()
  }

  getContact(withSpinner:boolean = false)
  {
    if(withSpinner)
    {
      this.appState.openSpinner();
    }
    let sub = this.service.getContact(this.contactInputId, true).subscribe(
      {
        next: (data) =>
        {
          this.contact = data
          this.getContactInformation()
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  getContactInformation()
  {
    let sub = this.service.getContactInformation(this.contactInputId).subscribe(
      {
        next: (data) =>
        {
          this.contactInformation = data
          this.setAddressInputs()
          this.appState.closeSpinner()
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      })
  }

  setAddressInputs()
  {
    this.currentMailingAddress = this.contactInformation?.physicalAddresses?.find(x => x.addressType == AddressType_DTO.Mailing) ?? new PhysicalAddress_DTO
    this.currentBillingAddress = this.contactInformation?.physicalAddresses?.find(x => x.addressType == AddressType_DTO.Billing) ?? new PhysicalAddress_DTO
    this.currentShippingAddress = this.contactInformation?.physicalAddresses?.find(x => x.addressType == AddressType_DTO.Shipping) ?? new PhysicalAddress_DTO
    this.currentMailingAddress.addressType = AddressType_DTO.Mailing
    this.currentBillingAddress.addressType = AddressType_DTO.Billing
    this.currentShippingAddress.addressType = AddressType_DTO.Shipping
  }

  openAddOrEditPhoneNumberModal(number?: PhoneNumber_DTO)
  {
    let modalRef = this.appState.openDialog(AddOrEditPhoneNumberComponent, number);
    let sub = modalRef.subscribe(
      {
        next: (data) =>
        {
          if(data != undefined)
          {
            data.id == 0 ? this.addPhoneNumber(data) : this.updatePhoneNumber(data)
          }
          this.appState.closeDialog()
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  openDeletePhoneNumberModal(number: PhoneNumber_DTO)
  {
    var options = new ConfirmationDialogOptions()
    options.title = "Delete Phone Number"
    options.text = `Are you sure you want to delete ${this.phonePipe.transform(number!)}?`

    let sub = this.appState.openConfirmationDialog(options).subscribe(
      {
        next: (response) =>
        {
          response == true ? this.deletePhoneNumber(number) : null
        },
        error: () =>
        {
          let message = new Message()
          message.type = MessageType.Error
          message.text = "There was an error deleting the phone number"
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          sub.unsubscribe()
          this.appState.closeDialog()
        }
      }
    )
  }

  addPhoneNumber(number: PhoneNumber_DTO)
  {
    this.appState.openSpinner("Adding phone number")
    number.contactInformationId = this.contactInformation?.id
    let sub = this.service.AddPhoneNumber(number).subscribe(
      {
        next: (data) =>
        {
          this.contactInformation?.phoneNumbers?.push(data)
          const message = new Message(MessageType.Success, `${this.phonePipe.transform(number)} has been added to ${this.namePipe.transform(this.contact)}'s phone numbers.`)
          this.appState.sendAlert(message)
          this.appState.closeSpinner()
        },
        error: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Error, "There was an error and the phone number could not be added")
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  updatePhoneNumber(number: PhoneNumber_DTO)
  {
    this.appState.openSpinner("Updating phone number")
    let sub = this.service.UpdatePhoneNumber(number).subscribe(
      {
        next: (data) =>
        {
          var i = this.contactInformation?.phoneNumbers?.indexOf(number)
          if (i != undefined)
          {
            this.contactInformation?.phoneNumbers?.splice(i ,1)
          }
          this.contactInformation?.phoneNumbers?.push(data)
          const message = new Message(MessageType.Success, `${this.namePipe.transform(this.contact)}'s phone numbers have been updated.`)
          this.appState.sendAlert(message)
          this.appState.closeSpinner()
        },
        error: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Error, "There was an error and the phone number could not be updated")
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  deletePhoneNumber(number: PhoneNumber_DTO)
  {
    this.appState.openSpinner("Deleting phone number")
    let sub = this.service.DeletePhoneNumber(number).subscribe(
      {
        next: () =>
        {
          var i = this.contactInformation?.phoneNumbers?.indexOf(number)
          if (i != undefined)
          {
            this.contactInformation?.phoneNumbers?.splice(i ,1)
            const message = new Message(MessageType.Success, `${this.phonePipe.transform(number)} has been deleted.`)
            this.appState.sendAlert(message)
            this.appState.closeSpinner()
          }
        },
        error: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Error, "There was an error and the phone number could not be deleted")
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  openAddOrEditEmailAddressModal(address?:EmailAddress_DTO)
  {
    let modalRef = this.appState.openDialog(AddOrEditEmailAddressComponent, address);
    let sub = modalRef.subscribe(
      {
        next: (data) =>
        {
          if(data != undefined)
          {
            data.id == 0 ? this.addEmailAddress(data) : this.updateEmailAddress(data)
            this.appState.closeDialog()
          }
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  openDeleteEmailAddressModal(address:EmailAddress_DTO | undefined)
  {
    var options = new ConfirmationDialogOptions()
    options.title = "Delete Email Address"
    options.text = `Are you sure you want to delete ${address?.address}?`

    let sub = this.appState.openConfirmationDialog(options).subscribe(
      {
        next: (response) =>
        {
          response == true ? this.deleteEmailAddress(address!) : null
        },
        complete: () =>
        {
          this.appState.closeDialog()
          sub.unsubscribe()
        }
      }
    )
  }

  addEmailAddress(address:EmailAddress_DTO)
  {
    this.appState.openSpinner("Adding email address")
    address.contactInformationId = this.contactInformation?.id ?? 0
    let sub = this.service.AddEmailAddress(address).subscribe(
      {
        next: (data) =>
        {
          this.contactInformation?.emailAddresses?.push(data)
          const message = new Message(MessageType.Success, `${address.address} has been added to ${this.namePipe.transform(this.contact)}.`)
          this.appState.sendAlert(message)
          this.appState.closeSpinner()
        },
        error: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Error, "There was an error and the email address could not be added")
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  updateEmailAddress(address:EmailAddress_DTO)
  {
    this.appState.openSpinner("Updating email address")
    let sub = this.service.UpdateEmailAddress(address).subscribe(
      {
        next: (data) =>
        {
          var index: number | undefined
          this.contactInformation?.emailAddresses?.forEach((e, i) => {
            if (e.id == address.id)
            {
              index = i
            }
          });
          if (index != undefined)
          {
            this.contactInformation?.emailAddresses?.splice(index)
          }
          this.contactInformation?.emailAddresses?.push(data)
          const message = new Message(MessageType.Success, `${address.address} has been updated.`)
          this.appState.sendAlert(message)
          this.appState.closeSpinner()
        },
        error: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Error, "There was an error and the email address could not be updated")
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  deleteEmailAddress(address:EmailAddress_DTO)
  {
    this.appState.openSpinner("Deleting email address")
    let sub = this.service.DeleteEmailAddress(address).subscribe(
      {
        next: (data) =>
        {
          var index: number | undefined
          this.contactInformation?.emailAddresses?.forEach((e, i) => {
            if (e.id == address.id)
            {
              index = i
            }
          });
          if (index != undefined)
          {
            this.contactInformation?.emailAddresses?.splice(index ,1)
          }
          this.appState.closeSpinner()
          const message = new Message(MessageType.Success, `${address.address} has been deleted.`)
          this.appState.sendAlert(message)
        },
        error: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Error, "There was an error and the email address could not be deleted")
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  onAddressReceived(address: PhysicalAddress_DTO)
  {
    if(address.id > 0)
    {
      this.updatePhysicalAddress(address)

    }
    else
    {
      this.addPhysicalAddress(address)
    }
  }

  addPhysicalAddress(address: PhysicalAddress_DTO)
  {
    this.appState.openSpinner(`Adding new ${AddressType_DTO[address.addressType].toLowerCase()} address`)
    address.id = 0
    address.contactInformationId = this.contactInformation?.id ?? 0
    let sub = this.service.AddPhysicalAddress(address).subscribe(
      {
        next: (data) =>
        {
          var index: number | undefined
          this.contactInformation?.physicalAddresses?.forEach((e, i) =>
          {
            if (e.id == address.id)
            {
              index = i
            }
          });
          if (index != undefined)
          {
            this.contactInformation?.physicalAddresses?.splice(index)
          }
          this.contactInformation?.physicalAddresses?.push(data)
          this.setAddressInputs()
          this.appState.closeSpinner()
          const message = new Message(MessageType.Success, `${this.namePipe.transform(this.contact)}'s ${AddressType_DTO[address.addressType].toLowerCase()} address has been added.`)
          this.appState.sendAlert(message)

        },
        error: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Error, `There was an error and the ${AddressType_DTO[address.addressType].toLowerCase()} could not be added`)
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  updatePhysicalAddress(address: PhysicalAddress_DTO)
  {
    this.appState.openSpinner(`Updating ${AddressType_DTO[address.addressType].toLowerCase()} address`)
    let sub = this.service.UpdatePhysicalAddress(address).subscribe(
      {
        next: (data) =>
        {
          var index: number | undefined
          this.contactInformation?.physicalAddresses?.forEach((e, i) => {
            if (e.id == address.id)
            {
              index = i
            }
          });
          if (index != undefined)
          {
            this.contactInformation?.physicalAddresses?.splice(index)
          }
          this.contactInformation?.physicalAddresses?.push(data)
          this.setAddressInputs()
          this.appState.closeSpinner()
          const message = new Message(MessageType.Success, `${this.namePipe.transform(this.contact)}'s ${AddressType_DTO[address.addressType].toLowerCase()} address has been updated.`)
          this.appState.sendAlert(message)
        },
        error: (error) =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Error, `There was an error and the ${AddressType_DTO[address.addressType].toLowerCase()} could not be updated`)
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  deletePhysicalAddress(address: PhysicalAddress_DTO)
  {
    this.appState.openSpinner(`Deleting ${AddressType_DTO[address.addressType].toLowerCase()} address`)
    let sub = this.service.DeletePhysicalAddress(address).subscribe(
      {
        next: () =>
        {
          //Find the address
          var index: number | undefined
          this.contactInformation?.physicalAddresses?.forEach((e, i) => {
            if (e.id == address.id)
            {
              index = i
            }
          });
          //Delete the address if it exists
          if (index != undefined)
          {
            this.contactInformation?.physicalAddresses?.splice(index, 1)
          }
          this.setAddressInputs()
          this.appState.closeSpinner()
          const message = new Message(MessageType.Success, `${this.namePipe.transform(this.contact)}'s ${AddressType_DTO[address.addressType].toLowerCase()} address has been deleted.`)
          this.appState.sendAlert(message)
        },
        error: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Error, `There was an error and the ${AddressType_DTO[address.addressType].toLowerCase()} could not be deleted`)
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }
}
