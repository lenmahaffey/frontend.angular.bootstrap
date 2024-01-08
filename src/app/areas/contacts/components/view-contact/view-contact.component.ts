import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddressType, Contact_DTO, EmailAddress_DTO, PhoneNumber_DTO, PhysicalAddress_DTO } from 'src/app/shared/api/api.models';
import { AddPhoneNumberModalComponent } from '../phone-number-modal/add-phone-number-modal.component';
import { ContactService } from '../../contact.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { PhoneNumberToFormattedStringPipe } from 'src/app/shared/pipes/phone-number-to-formatted-string.pipe';
import { AddEmailAddressModalComponent } from '../email-address-modal/add-email-address-modal.component';
import { AddContactModalComponent } from '../contact-modal/add-contact.component';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {

  contact: Contact_DTO = new Contact_DTO()
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

  constructor(
    private _dialog: MatDialog,
    private service: ContactService,
    private phonePipe: PhoneNumberToFormattedStringPipe,
    private namePipe: ContactNamePipe,
    private appState: AppStateService,
    private cdr: ChangeDetectorRef)
  {}

  ngOnInit(): void {
    this.getContact()
  }

  getContact()
  {
    let sub = this.service.getContact(this.contactInputId, true).subscribe(
      {
        next: (data) =>
        {
          this.contact = data
          this.setAddressInputs()
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  setAddressInputs()
  {
    this.currentMailingAddress = this.contact.contactInformation?.physicalAddresses?.find(x => x.addressType == AddressType.Mailing) ?? new PhysicalAddress_DTO
    this.currentBillingAddress = this.contact.contactInformation?.physicalAddresses?.find(x => x.addressType == AddressType.Billing) ?? new PhysicalAddress_DTO
    this.currentShippingAddress = this.contact.contactInformation?.physicalAddresses?.find(x => x.addressType == AddressType.Shipping) ?? new PhysicalAddress_DTO
    this.currentMailingAddress.addressType = AddressType.Mailing
    this.currentBillingAddress.addressType = AddressType.Billing
    this.currentShippingAddress.addressType = AddressType.Shipping
  }

  openAddPhoneNumberModal(number?: PhoneNumber_DTO)
  {
    var config = new MatDialogConfig()
    config.data =
    {
      dto: number = number
    }
    config.disableClose = false;
    config.position =
    {
      top: "5%"
    }
    config.autoFocus = false
    let modalRef = this._dialog.open(AddPhoneNumberModalComponent, config);
    let sub = modalRef.componentInstance.response.subscribe(
      {
        next: (data) =>
        {
          if(data != undefined)
          {
            data.id == 0 ? this.addPhoneNumber(data) : this.updatePhoneNumber(data)
          }
        },
        complete: () =>
        {
          modalRef.close()
          sub.unsubscribe()
        }
      }
    )
  }

  openDeletePhoneNumberModal(number: PhoneNumber_DTO)
  {
    var options = new ConfirmationDialogOptions()
    options.title = "Delete Phone Number",
    options.text = `Are you sure you want to delete ${this.phonePipe.transform(number!)}?`,
    options.yesButtonText = "yes",
    options.noButtonText = "no",
    this.appState.openConfirmationDialog(options).subscribe(
      {
        next: (response) =>
        {
          response == true ? this.deletePhoneNumber(number) : null
        },
        error: () =>
        {

        },
        complete: () =>
        {
          this.appState.closeConfirmationDialog()
        }
      }
    )
  }

  addPhoneNumber(number: PhoneNumber_DTO)
  {
    const options = new MatDialogConfig()
    options.data =
    {
      message: "Adding phone number"
    }
    this.appState.openSpinner(options)
    number.contactInformationId = this.contact.contactInformation?.id ?? 0
    let sub = this.service.AddPhoneNumber(number).subscribe(
      {
        next: (data) =>
        {
          this.contact.contactInformation?.phoneNumbers?.push(data)
          this.appState.alertMessage = new Message(MessageType.Success, `${this.phonePipe.transform(number)} has been added to ${this.namePipe.transform(this.contact)}'s phone numbers.`)
          this.appState.sendAlert()
          this.appState.closeSpinner()
        },
        error: () =>
        {
          this.appState.closeSpinner()
          this.appState.alertMessage.type = MessageType.Error
          this.appState.alertMessage.text = "There was an error and the phone number could not be added"
          this.appState.alertMessage.autoDismiss = true
          this.appState.sendAlert()
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
    const options = new MatDialogConfig()
    options.data =
    {
      message: "Updating phone number"
    }
    this.appState.openSpinner(options)
    let sub = this.service.UpdatePhoneNumber(number).subscribe(
      {
        next: (data) =>
        {
          console.log("updated:")
          console.log(data)
          var i = this.contact.contactInformation?.phoneNumbers?.indexOf(number)
          if (i != undefined)
          {
            this.contact.contactInformation?.phoneNumbers?.splice(i ,1)
          }
          this.contact.contactInformation?.phoneNumbers?.push(data)
          this.appState.alertMessage = new Message(MessageType.Success, `${this.namePipe.transform(this.contact)}'s phone numbers have been updated.`)
          this.appState.sendAlert()
          this.appState.closeSpinner()
        },
        error: () =>
        {
          this.appState.closeSpinner()
          this.appState.alertMessage.type = MessageType.Error
          this.appState.alertMessage.text = "There was an error and the phone number could not be updated"
          this.appState.alertMessage.autoDismiss = true
          this.appState.sendAlert()
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
    const options = new MatDialogConfig()
    options.data =
    {
      message: "Deleting phone number"
    }
    this.appState.openSpinner(options)
    let sub = this.service.DeletePhoneNumber(number).subscribe(
      {
        next: () =>
        {
          var i = this.contact.contactInformation?.phoneNumbers?.indexOf(number)
          if (i != undefined)
          {
            this.contact.contactInformation?.phoneNumbers?.splice(i ,1)
            this.appState.alertMessage = new Message(MessageType.Success, `${this.phonePipe.transform(number)} has been deleted.`)
            this.appState.sendAlert()
            this.appState.closeSpinner()
          }
        },
        error: () =>
        {
          this.appState.closeSpinner()
          this.appState.alertMessage.type = MessageType.Error
          this.appState.alertMessage.text = "There was an error and the phone number could not be deleted"
          this.appState.alertMessage.autoDismiss = true
          this.appState.sendAlert()
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  openAddEmailAddressModal(address?:EmailAddress_DTO)
  {
    var config = new MatDialogConfig()
    config.data =
    {
      dto: address
    }
    config.disableClose = false;
    config.position =
    {
      top: "5%"
    }
    config.autoFocus = false
    let modalRef = this._dialog.open(AddEmailAddressModalComponent, config);
    let sub = modalRef.componentInstance.response.subscribe(
      {
        next: (data) =>
        {
          if(data != undefined)
          {
            data.id == 0 ? this.addEmailAddress(data) : this.updateEmailAddress(data)
          }
        },
        complete: () =>
        {
          modalRef.close()
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
    options.yesButtonText = "yes"
    options.noButtonText = "no"

    let sub = this.appState.openConfirmationDialog(options).subscribe(
      {
        next: (response) =>
        {
          response == true ? this.deleteEmailAddress(address!) : null
        },
        complete: () =>
        {
          this.appState.closeConfirmationDialog()
          sub.unsubscribe()
        }
      }
    )
  }

  addEmailAddress(address:EmailAddress_DTO)
  {
    const options = new MatDialogConfig()
    options.data =
    {
      message: "Adding email address"
    }
    this.appState.openSpinner(options)
    address.contactInformationId = this.contact.contactInformation?.id ?? 0
    let sub = this.service.AddEmailAddress(address).subscribe(
      {
        next: (data) =>
        {
          this.contact.contactInformation?.emailAddresses?.push(data)
          this.appState.alertMessage = new Message(MessageType.Success, `${address.address} has been added to ${this.namePipe.transform(this.contact)}.`)
          this.appState.sendAlert()
          this.appState.closeSpinner()
        },
        error: () =>
        {
          this.appState.closeSpinner()
          this.appState.alertMessage.type = MessageType.Error
          this.appState.alertMessage.text = "There was an error and the email address could not be added"
          this.appState.alertMessage.autoDismiss = true
          this.appState.sendAlert()
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
    const options = new MatDialogConfig()
    options.data =
    {
      message: "Updating email address"
    }
    this.appState.openSpinner(options)
    let sub = this.service.UpdateEmailAddress(address).subscribe(
      {
        next: (data) =>
        {
          var index: number | undefined
          this.contact.contactInformation?.emailAddresses?.forEach((e, i) => {
            if (e.id == address.id)
            {
              index = i
            }
          });
          if (index != undefined)
          {
            this.contact.contactInformation?.emailAddresses?.splice(index)
          }
          this.contact.contactInformation?.emailAddresses?.push(data)
          this.appState.alertMessage = new Message(MessageType.Success, `${address.address} has been updated.`)
          this.appState.sendAlert()
          this.appState.closeSpinner()
        },
        error: () =>
        {
          this.appState.closeSpinner()
          this.appState.alertMessage.type = MessageType.Error
          this.appState.alertMessage.text = "There was an error and the email address could not be updated"
          this.appState.alertMessage.autoDismiss = true
          this.appState.sendAlert()
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
    const options = new MatDialogConfig()
    options.data =
    {
      message: "Deleting email address"
    }
    this.appState.openSpinner(options)
    let sub = this.service.DeleteEmailAddress(address).subscribe(
      {
        next: (data) =>
        {
          var index: number | undefined
          this.contact.contactInformation?.emailAddresses?.forEach((e, i) => {
            if (e.id == address.id)
            {
              index = i
            }
          });
          if (index != undefined)
          {
            this.contact.contactInformation?.emailAddresses?.splice(index ,1)
          }
          this.appState.alertMessage = new Message(MessageType.Success, `${address.address} has been deleted.`)
          this.appState.sendAlert()
        },
        error: () =>
        {
          this.appState.closeSpinner()
          this.appState.alertMessage.type = MessageType.Error
          this.appState.alertMessage.text = "There was an error and the email address could not be deleted"
          this.appState.alertMessage.autoDismiss = true
          this.appState.sendAlert()
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
    console.log(address)
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
    const options = new MatDialogConfig()
    options.data =
    {
      message: `Adding new ${AddressType[address.addressType].toLowerCase()} address`
    }
    this.appState.openSpinner(options)
    address.id = 0
    address.contactInformationId = this.contact.contactInformation?.id ?? 0
    let sub = this.service.AddPhysicalAddress(address).subscribe(
      {
        next: (data) =>
        {
          var index: number | undefined
          this.contact.contactInformation?.physicalAddresses?.forEach((e, i) =>
          {
            if (e.id == address.id)
            {
              index = i
            }
          });
          if (index != undefined)
          {
            this.contact.contactInformation?.physicalAddresses?.splice(index)
          }
          this.contact.contactInformation?.physicalAddresses?.push(data)
          this.setAddressInputs()
          this.appState.closeSpinner()
          this.appState.alertMessage = new Message(MessageType.Success, `${this.namePipe.transform(this.contact)}'s ${AddressType[address.addressType].toLowerCase()} address has been added.`)
          this.appState.sendAlert()

        },
        error: () =>
        {
          this.appState.closeSpinner()
          this.appState.alertMessage.type = MessageType.Error
          this.appState.alertMessage.text = `There was an error and the ${AddressType[address.addressType].toLowerCase()} could not be added`
          this.appState.alertMessage.autoDismiss = true
          this.appState.sendAlert()
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
    const options = new MatDialogConfig()
    options.data =
    {
      message: `Updating ${AddressType[address.addressType].toLowerCase()} address`
    }
    this.appState.openSpinner(options)
    let sub = this.service.UpdatePhysicalAddress(address).subscribe(
      {
        next: (data) =>
        {
          var index: number | undefined
          this.contact.contactInformation?.physicalAddresses?.forEach((e, i) => {
            if (e.id == address.id)
            {
              index = i
            }
          });
          if (index != undefined)
          {
            this.contact.contactInformation?.physicalAddresses?.splice(index)
          }
          this.contact.contactInformation?.physicalAddresses?.push(data)
          this.setAddressInputs()
          this.appState.closeSpinner()
          this.appState.alertMessage = new Message(MessageType.Success, `${this.namePipe.transform(this.contact)}'s ${AddressType[address.addressType].toLowerCase()} address has been updated.`)
          this.appState.sendAlert()
        },
        error: (error) =>
        {
          this.appState.closeSpinner()
          this.appState.alertMessage.type = MessageType.Error
          this.appState.alertMessage.text = `There was an error and the ${AddressType[address.addressType].toLowerCase()} could not be updated`
          this.appState.alertMessage.autoDismiss = true
          this.appState.sendAlert()
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
    const options = new MatDialogConfig()
    options.data =
    {
      message: `Deleting ${AddressType[address.addressType].toLowerCase()} address`
    }
    this.appState.openSpinner(options)
    let sub = this.service.DeletePhysicalAddress(address).subscribe(
      {
        next: () =>
        {
          //Find the address
          var index: number | undefined
          this.contact.contactInformation?.physicalAddresses?.forEach((e, i) => {
            if (e.id == address.id)
            {
              index = i
            }
          });
          //Delete the address if it exists
          if (index != undefined)
          {
            this.contact.contactInformation?.physicalAddresses?.splice(index, 1)
            this.setAddressInputs()
            this.appState.closeSpinner()
            this.appState.alertMessage = new Message(MessageType.Success, `${this.namePipe.transform(this.contact)}'s ${AddressType[address.addressType].toLowerCase()} address has been deleted.`)
            this.appState.sendAlert()
          }
        },
        error: () =>
        {
          this.appState.closeSpinner()
          this.appState.alertMessage.type = MessageType.Error
          this.appState.alertMessage.text = `There was an error and the ${AddressType[address.addressType].toLowerCase()} could not be deleted`
          this.appState.alertMessage.autoDismiss = true
          this.appState.sendAlert()
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  onEditContactClicked()
  {
    var config = new MatDialogConfig()
    config.data =
    {
      dto: this.contact
    }
    config.disableClose = false;
    config.position =
    {
      top: "5%"
    }
    let modalRef = this._dialog.open(AddContactModalComponent, config);
    let sub = modalRef.componentInstance.response.subscribe(
      {
        next: (data) =>
        {
          if(data != null)
          {
          }
          modalRef.close()
          sub.unsubscribe()
        }
      }
    )
  }

  onContactDroppedOnCustomerContacts(event:any)
  {
    const id = this.contact.customer?.id
    if(id != undefined)
    {
      let sub = this.service.AddContactToCustomer(event.item.data.id, id).subscribe(
        {
          next: (data) =>
          {
            this.contact.customerContacts?.push(data)
            this.cdr.detectChanges()
          },
          complete: () =>
          {
            sub.unsubscribe
          }
        }
      )
    }
  }

  onContactDroppedOnCompetitorContacts(event:any)
  {
    const id = this.contact.competitor?.id
    if(id != undefined)
    {
      let sub = this.service.AddContactToCompetitor(event.item.data.id, id).subscribe(
        {
          next: (data) =>
          {
            this.contact.competitorContacts?.push(data)
          },
          complete: () =>
          {
            sub.unsubscribe
          }
        }
      )
    }
  }

  onContactDroppedOnManufacturerContacts(event:any)
  {
    const id = this.contact.manufacturer?.id
    if(id != undefined)
    {
      let sub = this.service.AddContactToManufacturer(event.item.data.id, id).subscribe(
        {
          next: (data) =>
          {
            this.contact.manufacturerContacts?.push(data)
          },
          complete: () =>
          {
            sub.unsubscribe
          }
        }
      )
    }
  }

  onContactDroppedOnVendorContacts(event:any)
  {
    const id = this.contact.vendor?.id
    if(id != undefined)
    {
      let sub = this.service.AddContactToVendor(event.item.data.id, id).subscribe(
        {
          next: (data) =>
          {
            this.contact.vendorContacts?.push(data)
          },
          complete: () =>
          {
            sub.unsubscribe
          }
        }
      )
    }
  }

  onContactDroppedOnVenueContacts(event:any)
  {
    const id = this.contact.venue?.id
    if(id != undefined)
    {
      let sub = this.service.AddContactToVenue(event.item.data.id, id).subscribe(
        {
          next: (data) =>
          {
            this.contact.venueContacts?.push(data)
          },
          complete: () =>
          {
            sub.unsubscribe
          }
        }
      )
    }
  }
}
