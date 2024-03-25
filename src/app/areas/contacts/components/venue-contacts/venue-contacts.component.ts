import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
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
  contacts: VenueContact_DTO[] = []
  numbers:PhoneNumber_DTO[] = []

  constructor(
    private service: ContactService,
    private appState: AppStateService,
    private namePipe: ContactNamePipe) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getVenueContacts()
  }

  getVenueContacts()
  {
    if(this.venueId > 0)
    {
      let sub = this.service.ListVenueContactsForVenue(this.venueId).subscribe(
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
          },
          complete: () =>
          {
            sub.unsubscribe()
          }
        })
    }
    else if(this.contactId > 0)
    {
      let sub = this.service.ListVenueContactsForContact(this.contactId).subscribe(
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
          },
          complete: () =>
          {
            sub.unsubscribe()
          }
        })
    }
  }

  getPhoneNumbersForVenues()
  {
    this.contacts.forEach(contact => {
      let sub = this.service.GetPhoneNumbersForContact(contact.venue?.contactId!).subscribe(
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
            message.type = MessageType.Error
            message.text = "There was an error getting the venue contact phone numbers."
          },
          complete: () =>
          {
            sub.unsubscribe()
          }
        })
    });
  }

  getPhoneNumbersForContacts()
  {
    this.contacts.forEach(contact => {
      let sub = this.service.GetPhoneNumbersForContact(contact.contactId).subscribe(
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
            message.type = MessageType.Error
            message.text = "There was an error getting the venue contact phone numbers."
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
    return this.numbers.find(x => x.contactInformationId == id)!
  }

  onContactDropped(event:any)
  {
    const contact = event.item.data
    this.appState.openSpinner(`Adding ${this.namePipe.transform(event.item.data)} as a venue contact`)
    if(this.venueId > 0)
    {
    let sub = this.service.AddVenueContact(this.venueId, contact.id).subscribe(
      {
        next: () =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(event.item.data)} was added as a venue contact.`
          this.appState.sendAlert(message);
          this.getVenueContacts()
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact.contact!)} could not be added as a venue contact.`
          this.appState.sendAlert(message);
        },
        complete: () =>
        {
          this.appState.closeSpinner()
          sub.unsubscribe
        }
      })
    }
  }

  onDeleteContactClicked(contact: VenueContact_DTO)
  {
    console.log(contact)
    var options = new ConfirmationDialogOptions()
    options.title = "Delete Contact?"
    options.text =`Are you sure you want to delete ${this.namePipe.transform(contact.contact!)} as a venue contact?`
    const sub = this.appState.openConfirmationDialog(options).subscribe(
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
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  deleteContact(contact: VenueContact_DTO)
  {
    this.appState.openSpinner(`Deleteing ${this.namePipe.transform(contact.contact!)} as a venue contact`)
    let sub = this.service.DeleteVenueContact(contact).subscribe(
      {
        next: () =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact.contact!)} was deleted as a venue contact.`
          this.appState.sendAlert(message);
          this.getVenueContacts()
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact.contact!)} could not be deleted as a venue contact.`
          this.appState.sendAlert(message);
        },
        complete: () =>
        {
          this.appState.closeSpinner()
          sub.unsubscribe
        }
      }
    )
  }
}
