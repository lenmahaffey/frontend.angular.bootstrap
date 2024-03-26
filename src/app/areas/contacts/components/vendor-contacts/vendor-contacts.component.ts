import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { VendorContact_DTO, PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { ContactService } from '../../contact.service';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';
import { take } from 'rxjs';

@Component({
  selector: 'app-vendor-contacts',
  templateUrl: './vendor-contacts.component.html',
  styleUrls: ['./vendor-contacts.component.scss']
})
export class VendorContactsComponent implements OnChanges{
  @Input() vendorId: number = 0
  @Input() contactId: number = 0
  @Output() update: EventEmitter<boolean> = new EventEmitter()
  contacts: VendorContact_DTO[] = []
  numbers:PhoneNumber_DTO[] = []

  constructor(
    private service: ContactService,
    private appState: AppStateService,
    private namePipe: ContactNamePipe)
  {}

  ngOnChanges(): void {
    this.getVendorContacts()
  }

  getVendorContacts()
  {
    if(this.vendorId > 0)
    {
      let sub = this.service.ListVendorContactsForVendor(this.vendorId).pipe(take(1)).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
            this.getPhoneNumbersForContacts()
          },
          error: () =>
          {
            let message = new Message()
            message.text = "There was an error getting the vendor contacts."
            this.appState.sendAlert(message);
          }
        })
        .add(() =>
        {

        })
    }
    else if(this.contactId > 0)
    {
      let sub = this.service.ListVendorContactsForContact(this.contactId).pipe(take(1)).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
            this.getPhoneNumbersForVendors()
          },
          error: () =>
          {
            let message = new Message()
            message.text = "There was an error getting the vendor contacts."
            this.appState.sendAlert(message);
          }
        })
        .add(() =>
        {

        })
    }
  }

  getPhoneNumbersForVendors()
  {
    this.contacts.forEach(contact => {
      let sub = this.service.GetPhoneNumbersForContact(contact.vendor?.contactId!).pipe(take(1)).subscribe(
        {
          next: (data) =>
          {
            if(data.length > 0)
            {
              data.forEach(d =>
                {
                  this.numbers.push(d)
                })
            }
          },
          error: () =>
          {
            let message = new Message()
            message.text = "There was an error getting the vendor contact phone numbers."
            this.appState.sendAlert(message);
          }
        })
        .add(() =>
        {

        })
    });
  }

  getPhoneNumbersForContacts()
  {
    this.contacts.forEach(contact => {
      let sub = this.service.GetPhoneNumbersForContact(contact.contactId).pipe(take(1)).subscribe({
        next: (data) =>
        {
          if(data.length > 0)
          {
          data.forEach(d =>
            {
              this.numbers.push(d)
            })
          }
        },
        error: () =>
        {
          let message = new Message()
          message.text = "There was an error getting the vendor contact phone numbers."
          this.appState.sendAlert(message);
        }
      })
      .add(() =>
      {
      })
    })
  }

  getNumber(id: number) : PhoneNumber_DTO
  {
    return this.numbers.find(x => x.contactInformationId == id)!
  }

  onContactDropped(event:any)
  {
    const contact = event.item.data
    this.appState.openSpinner(`Adding ${this.namePipe.transform(event.item.data)} as a vendor contact.`)
    if(this.vendorId > 0)
    {
    let sub = this.service.AddVendorContact(this.vendorId, contact.id).pipe(take(1)).subscribe(
      {
        next: () =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(event.item.data)} was added as a vendor contact.`
          this.appState.sendAlert(message);
          this.update.next(true)
          this.getVendorContacts()
        },
        error: () =>
        {
          let message = new Message()
          message.text = "There was an error adding the contact."
          this.appState.sendAlert(message);
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
    }
  }

  onDeleteContactClicked(contact: VendorContact_DTO)
  {
    var config = new ConfirmationDialogOptions()
    config.title = "Delete Contact?"
    config.text = `Are you sure you want to delete ${this.namePipe.transform(contact.contact!)} as a vendor contact?`
    const sub = this.appState.openConfirmationDialog(config).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          if(data)
          {
            this.deleteContact(contact)
          }
        },
        error: () =>
        {
          let message = new Message()
          message.text = "There was an error deleting the contact."
          this.appState.sendAlert(message);
        }
      })
    .add(() =>
      {
        this.appState.closeSpinner()
      })
  }

  deleteContact(contact: VendorContact_DTO)
  {
    this.appState.openSpinner(`Deleteing ${this.namePipe.transform(contact.contact!)} as a vendor contact.`)
    let sub = this.service.DeleteVendorContact(contact).pipe(take(1)).subscribe(
      {
        next: () =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact.contact!)} was deleted as a vendor contact.`
          this.appState.sendAlert(message);
          this.update.next(true)
          this.getVendorContacts()
        },
        error: () =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact.contact!)} could not be deleted as a vendor contact.`
          this.appState.sendAlert(message);
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }
}
