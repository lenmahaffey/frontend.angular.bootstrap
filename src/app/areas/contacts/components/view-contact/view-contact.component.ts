import { CdkDragDrop, CdkDragEnd, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddressType, Contact_DTO, PhoneNumber_DTO, PhysicalAddress_DTO } from 'src/app/shared/api/api.models';
import { AddPhoneNumberModalComponent } from '../add-phone-number-modal/add-phone-number-modal.component';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent {
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

  constructor( private _dialog: MatDialog){
    this._contact = new Contact_DTO()
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
    let modalRef = this._dialog.open(AddPhoneNumberModalComponent, config);
    let sub = modalRef.componentInstance.response.subscribe(
      {
        next: (data) =>
        {
          // console.log(data)
        },
        complete: () =>
        {
          modalRef.close()
          sub.unsubscribe()
        }
      }
    )
  }
}
