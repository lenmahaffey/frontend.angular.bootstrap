import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { VenueContact_DTO, PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { ContactService } from '../../contact.service';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';

@Component({
  selector: 'app-venue-contacts',
  templateUrl: './venue-contacts.component.html',
  styleUrls: ['./venue-contacts.component.scss']
})
export class VenueContactsComponent implements OnChanges{
  @Input() venueId: number = 0
  @Input() contactId: number = 0
  @Output() update: EventEmitter<boolean> = new EventEmitter()
  contacts: VenueContact_DTO[] = []
  numbers:PhoneNumber_DTO[] = []

  constructor(
    private service: ContactService,
    private appState: AppStateService,
    private namePipe: ContactNamePipe) {
  }

  ngOnChanges(): void {
    this.getVenueContacts()
  }

  getVenueContacts()
  {
    if(this.venueId > 0)
    {
      this.service.ListVenueContactsForVenue(this.venueId).subscribe(
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
            message.text = "There was an error getting the venue contacts."
          }
        })
    }
    else if(this.contactId > 0)
    {
      this.service.ListVenueContactsForContact(this.contactId).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
            this.getPhoneNumbersForVenues()
          },
          error: () =>
          {
            let message = new Message()
            message.type = MessageType.Error
            message.text = "There was an error getting the venue contacts."
          }
        })
    }
  }

  getPhoneNumbersForVenues()
  {
    this.contacts.forEach(contact => {
      this.service.GetPhoneNumbersForContact(contact.venue?.contactId!).subscribe(
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
            message.text = "There was an error getting the venue contact phone numbers."
          }
        })
    });
  }

  getPhoneNumbersForContacts()
  {
    this.contacts.forEach(contact => {
      this.service.GetPhoneNumbersForContact(contact.contactId).subscribe(
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
            message.text = "There was an error getting the venue contact phone numbers."
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

    this.appState.openSpinner(`Adding ${this.namePipe.transform(event.item.data)} as a venue contact`)
    if(this.venueId > 0)
    {
    this.service.AddVenueContact(this.venueId, contact.id).subscribe(
      {
        next: () =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(event.item.data)} was added as a venue contact.`
          this.update.next(true)
          this.appState.sendAlert(message);
          this.getVenueContacts()
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact.contact!)} could not be added as a venue contact.`
          this.appState.sendAlert(message);
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
    }
  }

  openDeleteContactDialog(contact: VenueContact_DTO)
  {
    var options = new ConfirmationDialogOptions()
    options.title = "Delete Contact?"
    options.text =`Are you sure you want to delete ${this.namePipe.transform(contact.contact!)} as a venue contact?`
    this.appState.openConfirmationDialog(options).subscribe(
      {
        next: (data) =>
        {
          if( data)
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
  }

  deleteContact(contact: VenueContact_DTO)
  {
    this.appState.openSpinner(`Deleteing ${this.namePipe.transform(contact.contact!)} as a venue contact`)
    this.service.DeleteVenueContact(contact).subscribe(
      {
        next: () =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact.contact!)} was deleted as a venue contact.`
          this.appState.sendAlert(message);
          this.update.next(true)
          this.getVenueContacts()
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact.contact!)} could not be deleted as a venue contact.`
          this.appState.sendAlert(message);
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }
}
