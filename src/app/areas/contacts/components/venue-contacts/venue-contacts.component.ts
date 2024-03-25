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
    const Venue = this.contacts[0].venue
    const contact = event.item.data
    this.appState.openSpinner(`Adding ${this.namePipe.transform(event.item.data)} to ${this.namePipe.transform(Venue!.contact!)} as a Venue contact`)
    if(Venue != undefined)
    {
    let sub = this.service.AddVenueContact(this.venueId, contact.id).subscribe(
      {
        next: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Success, `${this.namePipe.transform(event.item.data)} was added to ${this.namePipe.transform(Venue!.contact!)} as a Venue contact`, true)
          this.appState.sendAlert(message);
          this.getVenueContacts()
        },
        complete: () =>
        {
          sub.unsubscribe
        }
      })
    }
  }

  onDeleteContactClicked(contact: VenueContact_DTO)
  {
    var config = new ConfirmationDialogOptions()
    config.title = "Delete Contact?"
    config.text =`Are you sure you want to delete ${this.namePipe.transform(contact.contact!)} from ${this.namePipe.transform(contact.venue?.contact!)} as a Venue contact`
    const sub = this.appState.openConfirmationDialog().subscribe(
      {
        next: (data) =>
        {
          if( data)
          {
            this.deleteContact(contact)
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

  deleteContact(contact: VenueContact_DTO)
  {
    this.appState.openSpinner(`Deleteing ${this.namePipe.transform(contact.contact!)} from ${this.namePipe.transform(contact.venue?.contact!)} as a Venue contact`)
    let sub = this.service.DeleteVenueContact(contact).subscribe(
      {
        next: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Success, `${this.namePipe.transform(contact.contact!)} was deleted from ${this.namePipe.transform(contact.venue?.contact!)}'s Venue contacts`, true)
          this.appState.sendAlert(message);
          this.getVenueContacts()
        },
        complete: () =>
        {
          sub.unsubscribe
        }
      }
    )
  }
}
