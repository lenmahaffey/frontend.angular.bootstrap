import { CdkDragDrop, CdkDragEnd, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddressType, Contact_DTO, EmailAddress_DTO, PhoneNumber_DTO, PhysicalAddress_DTO } from 'src/app/shared/api/api.models';
import { AddPhoneNumberModalComponent } from '../add-phone-number-modal/add-phone-number-modal.component';
import { ContactService } from '../../contact.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { PhoneNumberToFormattedStringPipe } from 'src/app/shared/pipes/phone-number-to-formatted-string.pipe';
import { AddEmailAddressModalComponent } from '../add-email-address-modal/add-email-address-modal.component';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { SpinnerOptions } from 'src/app/shared/spinner/SpinnerOptions';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent {

  contact: Contact_DTO = new Contact_DTO()

  private _contactInput: Contact_DTO = new Contact_DTO()

  @Input() get contactInput() : Contact_DTO{
    return this._contactInput;
  }
  set contactInput(value: Contact_DTO){
    this._contactInput = value
    this.contact = value
    // this.getContact(value.id)
    this.setAddressInputs()
  }

  currentMailingAddress: PhysicalAddress_DTO = new PhysicalAddress_DTO()
  currentBillingAddress: PhysicalAddress_DTO = new PhysicalAddress_DTO()
  currentShippingAddress: PhysicalAddress_DTO = new PhysicalAddress_DTO()

  private _updatedMailingAddress: PhysicalAddress_DTO = new PhysicalAddress_DTO()
  get updatedMailingAddress()
  {
    return this._updatedMailingAddress
  }
  set updatedMailingAddress(value: PhysicalAddress_DTO)
  {
    this._updatedMailingAddress = value
  }

  _updatedBillingAddress: PhysicalAddress_DTO = new PhysicalAddress_DTO()
  get updatedBillingAddress()
  {
    return this._updatedBillingAddress
  }
  set updatedBillingAddress(value: PhysicalAddress_DTO)
  {
    this._updatedBillingAddress = value
  }

  _updatedShippingAddress: PhysicalAddress_DTO = new PhysicalAddress_DTO()
  get updatedShippingAddress()
  {
    return this._updatedShippingAddress
  }
  set updatedShippingAddress(value: PhysicalAddress_DTO)
  {
    this._updatedShippingAddress = value
  }

  constructor(
    private _dialog: MatDialog,
    private service: ContactService,
    private phonePipe: PhoneNumberToFormattedStringPipe,
    private namePipe: ContactNamePipe,
    private appState: AppStateService,
    private cdr: ChangeDetectorRef){
  }

  // getContact(value: number)
  // {
  //   let sub = this.service.getContact(value, true).subscribe(
  //     {
  //       next: (data) =>
  //       {
  //         this.contact = data
  //         this.setAddressInputs()
  //       },
  //       complete: () =>
  //       {
  //         sub.unsubscribe()
  //       }
  //     }
  //   )
  // }

  setAddressInputs()
  {
    this.currentMailingAddress = this.contact.contactInformation?.physicalAddresses?.find(x => x.addressType == AddressType.Mailing) ?? new PhysicalAddress_DTO
    this.currentBillingAddress = this.contact.contactInformation?.physicalAddresses?.find(x => x.addressType == AddressType.Billing) ?? new PhysicalAddress_DTO
    this.currentShippingAddress = this.contact.contactInformation?.physicalAddresses?.find(x => x.addressType == AddressType.Shipping) ?? new PhysicalAddress_DTO
    this.currentMailingAddress.addressType = AddressType.Mailing
    this.currentBillingAddress.addressType = AddressType.Billing
    this.currentShippingAddress.addressType = AddressType.Shipping
  }

  numberDropped(event: CdkDragDrop<PhoneNumber_DTO[]>) {
    moveItemInArray(this.contact?.contactInformation?.phoneNumbers!, event.previousIndex, event.currentIndex);
  }

  openAddPhoneNumberModal(number: PhoneNumber_DTO | undefined)
  {
    const bodyRect = document.body.getBoundingClientRect();
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

  openDeletePhoneNumberModal(number: PhoneNumber_DTO | undefined)
  {
    const bodyRect = document.body.getBoundingClientRect();
    var config = new MatDialogConfig()
    config.data =
    {
      dto: number = number,
      title: "Delete Phone Number",
      text: `Are you sure you want to delete ${this.phonePipe.transform(number!)}`,
      yesButtonText: "yes",
      noButtonText: "no",
    }
    config.disableClose = false;
    config.position =
    {
      top: "5%"
    }
    config.autoFocus = false
    let modalRef = this._dialog.open(ConfirmationDialogComponent, config);
    let sub = modalRef.componentInstance.response.subscribe(
      {
        next: (data) =>
        {
          this.deletePhoneNumber(number!)
        },
        complete: () =>
        {
          modalRef.close()
          sub.unsubscribe()
        }
      }
    )
  }

  openAddEmailAddressModal(address:EmailAddress_DTO | undefined)
  {
    const bodyRect = document.body.getBoundingClientRect();
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
    const bodyRect = document.body.getBoundingClientRect();
    var config = new MatDialogConfig()
    config.data =
    {
      dto: address,
      title: "Delete Email Address",
      text: `Are you sure you want to delete ${address?.address}`,
      yesButtonText: "yes",
      noButtonText: "no",
    }
    config.disableClose = false;
    config.position =
    {
      top: "5%"
    }
    config.autoFocus = false
    let modalRef = this._dialog.open(ConfirmationDialogComponent, config);
    let sub = modalRef.componentInstance.response.subscribe(
      {
        next: (data) =>
        {
          this.deleteEmailAddress(address!)
        },
        complete: () =>
        {
          modalRef.close()
          sub.unsubscribe()
        }
      }
    )
  }

  addPhoneNumber(number: PhoneNumber_DTO)
  {
    number.contactInformationId = this.contact.contactInformation?.id ?? 0
    let sub = this.service.AddPhoneNumber(number).subscribe(
      {
        next: (data) =>
        {
          this.contact.contactInformation?.phoneNumbers?.push(data)
        },
        error: () =>
        {

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
    let sub = this.service.UpdatePhoneNumber(number).subscribe(
      {
        next: (data) =>
        {
          var i = this.contact.contactInformation?.phoneNumbers?.indexOf(number)
          if (i != undefined)
            this.contact.contactInformation?.phoneNumbers?.splice(i ,1)
          this.contact.contactInformation?.phoneNumbers?.push(data)
        },
        error: () =>
        {

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
    let sub = this.service.DeletePhoneNumber(number).subscribe(
      {
        next: (data) =>
        {
          var i = this.contact.contactInformation?.phoneNumbers?.indexOf(number)
          if (i != undefined)
            this.contact.contactInformation?.phoneNumbers?.splice(i ,1)
        },
        error: () =>
        {

        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  addEmailAddress(address:EmailAddress_DTO)
  {
    address.contactInformationId = this.contact.contactInformation?.id ?? 0
    let sub = this.service.AddEmailAddress(address).subscribe(
      {
        next: (data) =>
        {
          this.contact.contactInformation?.emailAddresses?.push(data)
        },
        error: () =>
        {

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
            this.contact.contactInformation?.emailAddresses?.splice(index)
          this.contact.contactInformation?.emailAddresses?.push(data)
        },
        error: () =>
        {

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
            this.contact.contactInformation?.emailAddresses?.splice(index ,1)
        },
        error: () =>
        {

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
    address.id = 0
    address.contactInformationId = this.contact.contactInformation?.id ?? 0
    let sub = this.service.AddPhysicalAddress(address).subscribe(
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
            this.contact.contactInformation?.physicalAddresses?.splice(index)
          this.contact.contactInformation?.physicalAddresses?.push(data)
        },
        error: () =>
        {

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
    let sub = this.service.UpdatePhysicalAddress(address).subscribe(
      {
        next: (data) =>
        {
          this.contact.contactInformation?.physicalAddresses?.push(address)
        },
        error: () =>
        {

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
    let sub = this.service.DeletePhysicalAddress(address).subscribe(
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
            this.contact.contactInformation?.physicalAddresses?.splice(index ,1)
          this.setAddressInputs()
        },
        error: () =>
        {

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
    let modalRef = this._dialog.open(AddContactComponent, config);
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
            console.log(data)
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
