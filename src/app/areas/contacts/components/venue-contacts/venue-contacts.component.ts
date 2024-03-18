import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { VenueContact_DTO, PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { ContactService } from '../../contact.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

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
    private namePipe: ContactNamePipe,
    private dialog: MatDialog) {
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
      let sub = this.service.ListVenueContactsForContact(this.contactId).subscribe(
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
    const venue = this.contacts[0].venue
    const contact = event.item.data
    this.appState.openSpinner(`Adding ${this.namePipe.transform(contact)} to ${this.namePipe.transform(venue!.contact!)} as a Venue contact`)
    if(venue != null)
    {
      let sub = this.service.AddVenueContact(venue.id, contact.id).subscribe(
        {
          next: () =>
          {
            this.getVenueContacts()
            this.appState.closeSpinner()
            const message = new Message(MessageType.Success, `${this.namePipe.transform(event.item.data)} was added to ${this.namePipe.transform(venue!.contact!)} as a Venue contact`, true)
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
  onDeleteContactClicked(contact: VenueContact_DTO)
  {
    console.log("click")
    var config = new MatDialogConfig()
    config.data =
    {
      title: "Delete Contact?",
      text: `Are you sure you want to delete ${this.namePipe.transform(contact.contact!)} from ${this.namePipe.transform(contact.venue?.contact!)} as a Venue contact`,
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
