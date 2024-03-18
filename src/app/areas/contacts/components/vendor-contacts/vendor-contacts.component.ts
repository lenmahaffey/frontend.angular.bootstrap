import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { VendorContact_DTO, PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { ContactService } from '../../contact.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-vendor-contacts',
  templateUrl: './vendor-contacts.component.html',
  styleUrls: ['./vendor-contacts.component.scss']
})
export class VendorContactsComponent implements OnChanges{
  @Input() vendorId: number = 0
  @Input() contactId: number = 0
  contacts: VendorContact_DTO[] = []
  numbers:PhoneNumber_DTO[] = []

  constructor(
    private service: ContactService,
    private appState: AppStateService,
    private namePipe: ContactNamePipe,
    private dialog: MatDialog)
  {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getVendorContacts()
  }

  getVendorContacts()
  {
    if(this.vendorId > 0)
    {
      let sub = this.service.ListVendorContactsForVendor(this.vendorId).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
            this.getPhoneNumbers()
          },
          complete: () =>
          {
            sub.unsubscribe()
          }
        })
    }
    else if(this.contactId > 0)
    {
      let sub = this.service.ListVendorContactsForContact(this.contactId).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
          },
          complete: () =>
          {
            sub.unsubscribe()
          }
        })
    }
  }

  getPhoneNumbers()
  {
    this.contacts.forEach(contact => {
      let sub = this.service.GetPhoneNumbersForContact(contact.contactId).subscribe(
        {
          next: (data) =>
          {
            data.forEach(d =>
              {
                this.numbers.push(d)
              })
          },
          complete: () =>
          {
            sub.unsubscribe()
          }
        })
    });
  }

  getNumber(id: number) : PhoneNumber_DTO
  {
    return this.numbers.find(x => x.contactInformationId == id) ??
      new PhoneNumber_DTO()
  }

  onContactDropped(event:any)
  {
    const Vendor = this.contacts[0].vendor
    const contact = event.item.data
    const id = this.vendorId
    this.appState.openSpinner(`Adding ${this.namePipe.transform(contact)} to ${this.namePipe.transform(Vendor!.contact!)} as a Vendor contact`)
    if(Vendor != null)
    {
      let sub = this.service.AddVendorContact(Vendor.id, contact.id).subscribe(
        {
          next: () =>
          {
            this.getVendorContacts()
            this.appState.closeSpinner()
            const message = new Message(MessageType.Success, `${this.namePipe.transform(event.item.data)} was added to ${this.namePipe.transform(Vendor!.contact!)} as a Vendor contact`, true)
            this.appState.sendAlert(message);
          },
          complete: () =>
          {
            sub.unsubscribe
          }
        }
      )
    }
  }
  onDeleteContactClicked(contact: VendorContact_DTO)
  {
    console.log("click")
    var config = new MatDialogConfig()
    config.data =
    {
      title: "Delete Contact?",
      text: `Are you sure you want to delete ${this.namePipe.transform(contact.contact!)} from ${this.namePipe.transform(contact.vendor?.contact!)} as a Vendor contact`,
      noButtonText: "No",
      yesButtonText: "Yes"
    }
    config.disableClose = false;
    config.position =
    {
      top: "5%"
    }
    let modalRef = this.dialog.open(ConfirmationDialogComponent, config);
    const sub = modalRef.componentInstance.response.subscribe(
      {
        next: (data) =>
        {
          this.deleteContact(contact)
        },
        complete: () =>
        {
          sub.unsubscribe()
          modalRef.close()
        }
      }
    )
  }

  deleteContact(contact: VendorContact_DTO)
  {
    this.appState.openSpinner(`Deleteing ${this.namePipe.transform(contact.contact!)} from ${this.namePipe.transform(contact.vendor?.contact!)} as a Vendor contact`)
    let sub = this.service.DeleteVendorContact(contact).subscribe(
      {
        next: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Success, `${this.namePipe.transform(contact.contact!)} was deleted from ${this.namePipe.transform(contact.vendor?.contact!)}'s Vendor contacts`, true)
          this.appState.sendAlert(message);
          this.getVendorContacts()
        },
        complete: () =>
        {
          sub.unsubscribe
        }
      }
    )
  }
}
