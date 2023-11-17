import { CdkDragDrop, CdkDragEnd, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddressType, Contact_DTO, PhoneNumber_DTO, PhysicalAddress_DTO } from 'src/app/shared/api/api.models';
import { AddPhoneNumberModalComponent } from '../add-phone-number-modal/add-phone-number-modal.component';
import { ContactService } from '../../contact.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { PhoneNumberToFormattedStringPipe } from 'src/app/shared/pipes/phone-number-to-formatted-string.pipe';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {
  _contact: Contact_DTO
  @Input() get contact(){
    return this._contact;
  }
  set contact(value: Contact_DTO){
    this._contact = value
    this.contactInput = value
    this.mailingAddressInput = this._contact.contactInformation?.physicalAddresses?.find(x => x.addressType == AddressType.Mailing) ?? new PhysicalAddress_DTO
    this.billingAddressInput = this._contact.contactInformation?.physicalAddresses?.find(x => x.addressType == AddressType.Billing) ?? new PhysicalAddress_DTO
    this.shippingAddressInput = this._contact.contactInformation?.physicalAddresses?.find(x => x.addressType == AddressType.Shipping) ?? new PhysicalAddress_DTO
  }
  contactInput: Contact_DTO = new Contact_DTO()
  mailingAddressInput: PhysicalAddress_DTO = new PhysicalAddress_DTO()
  billingAddressInput: PhysicalAddress_DTO = new PhysicalAddress_DTO()
  shippingAddressInput: PhysicalAddress_DTO = new PhysicalAddress_DTO()

  constructor( private _dialog: MatDialog, private service: ContactService, private phonePipe: PhoneNumberToFormattedStringPipe){
    this._contact = new Contact_DTO()
  }
  ngOnInit(): void {
    if(this.contact.id != 0)
    {
      let sub = this.service.getContact(this.contact.id, true).subscribe(
        {
          next: (data) =>
          {
            this.contact = data
          },
          complete: () =>
          {
            sub.unsubscribe()
          }
        }
      )
    }
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

  addPhoneNumber(number: PhoneNumber_DTO)
  {
    console.log(this.contact)
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
          console.log(data)
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
          console.log(data)
          var i = this.contact.contactInformation?.phoneNumbers?.indexOf(number)
          if (i != undefined)
            this.contact.contactInformation!.phoneNumbers = this.contact.contactInformation?.phoneNumbers?.splice(i ,1)
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
  addPhysicalAddress(address: PhysicalAddress_DTO)
  {
    address.contactInformationId = this.contact.contactInformation?.id ?? 0
    let sub = this.service.AddPhysicalAddress(address).subscribe(
      {
        next: (data) =>
        {
          console.log(data)
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
          console.log(data)
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
}
