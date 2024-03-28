import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { ManufacturerContact_DTO, PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { ContactService } from '../../contact.service';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';
import { take } from 'rxjs';

@Component({
  selector: 'app-manufacturer-contacts',
  templateUrl: './manufacturer-contacts.component.html',
  styleUrls: ['./manufacturer-contacts.component.scss']
})
export class ManufacturerContactsComponent implements OnChanges{
  @Input() manufacturerId: number = 0
  @Input() contactId: number = 0
  @Output() update: EventEmitter<boolean> = new EventEmitter()
  contacts: ManufacturerContact_DTO[] = []
  numbers:PhoneNumber_DTO[] = []

  constructor(
    private service: ContactService,
    private appState: AppStateService,
    private namePipe: ContactNamePipe) {
  }

  ngOnChanges(): void {
    this.getManufacturerContacts()
  }

  getManufacturerContacts()
  {
    if(this.manufacturerId > 0)
    {
      this.service.ListManufacturerContactsForManufacturer(this.manufacturerId).pipe(take(1)).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
            this.getPhoneNumbersForContacts()
          },
          error: () =>
          {
            let message = new Message()
            message.type = MessageType.Error
            message.text = "There was an error getting the manufacturer contacts."
          }
        })
    }
    else if(this.contactId > 0)
    {
      this.service.ListManufacturerContactsForContact(this.contactId).pipe(take(1)).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
            this.getPhoneNumbersForManufacturers()
          },
          error: () =>
          {
            let message = new Message()
            message.type = MessageType.Error
            message.text = "There was an error getting the manufacturer contacts."
          }
        })
    }
  }

  getPhoneNumbersForManufacturers()
  {
    this.contacts.forEach(contact => {
      this.service.GetPhoneNumbersForContact(contact.manufacturer?.contactId!).pipe(take(1)).subscribe(
        {
          next: (data) =>
          {
            if(data != undefined)
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
            message.type = MessageType.Error
            message.text = "There was an error getting the manufacturer contact phone numbers."
          }
        })
    });
  }

  getPhoneNumbersForContacts()
  {
    this.contacts.forEach(contact => {
      this.service.GetPhoneNumbersForContact(contact.contactId).pipe(take(1)).subscribe(
        {
          next: (data) =>
          {
            if(data != undefined)
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
            message.type = MessageType.Error
            message.text = "There was an error getting the manufacturer contact phone numbers."
          }
        })
    });
  }

  getNumber(id: number) : PhoneNumber_DTO
  {
    return this.numbers.find(x => x.contactInformationId == id)!
  }

  onContactDropped(event:any)
  {
    const contact = event.item.data
    if(contact.isBusiness)
    {
      const message = new Message()
      message.text = `${this.namePipe.transform(contact)} is a business. Businesses can not be contacts for other businesses.`
      this.appState.sendAlert(message);
      return
    }
    if(this.contacts.findIndex(x => x.contactId == contact.id) > -1)
    {
      const message = new Message()
      message.text = `${this.namePipe.transform(contact)} is already a contact.`
      this.appState.sendAlert(message);
      return
    }
    this.appState.openSpinner(`Adding ${this.namePipe.transform(event.item.data)} as a manufacturer contact.`)
    if(this.manufacturerId > 0)
    {
    this.service.AddManufacturerContact(this.manufacturerId, contact.id).pipe(take(1)).subscribe(
      {
        next: () =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(event.item.data)} was added as a manufacturer contact.`,
          this.appState.sendAlert(message);
          this.update.next(true)
          this.getManufacturerContacts()
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact)} could not be added as a manufacturer contact.`
          this.appState.sendAlert(message);
        }
      })
      .add(() =>
        {
          this.appState.closeSpinner()
        })
    }
  }

  onDeleteContactClicked(contact: ManufacturerContact_DTO)
  {
    var options = new ConfirmationDialogOptions
    options.title = "Delete Contact?"
    options.text = `Are you sure you want to delete ${this.namePipe.transform(contact.contact!)} as a manufacturer contact?`
    const sub = this.appState.openConfirmationDialog(options).pipe(take(1)).subscribe(
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
          message.type = MessageType.Error
          message.text = "There was an error deleting the contact."
        }
      })
    .add(() =>
    {
      this.appState.closeSpinner()
    })
  }

  deleteContact(contact: ManufacturerContact_DTO)
  {
    this.appState.openSpinner(`Deleteing ${this.namePipe.transform(contact.contact!)} as a manufacturer contact.`)
    this.service.DeleteManufacturerContact(contact).pipe(take(1)).subscribe(
      {
        next: () =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact.contact!)} was deleted as a manufacturer contacts.`
          this.appState.sendAlert(message);
          this.update.next(true)
          this.getManufacturerContacts()
        },
        error: () =>
        {
          let message = new Message()
          message.type = MessageType.Error
          message.text = "There was an error deleting the contact."
        }
      })
    .add(() =>
    {
      this.appState.closeSpinner()
    })
  }
}
