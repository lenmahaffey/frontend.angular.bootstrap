import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CompetitorContact_DTO, PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { ContactService } from '../../contact.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-competitor-contacts',
  templateUrl: './competitor-contacts.component.html',
  styleUrls: ['./competitor-contacts.component.scss']
})
export class CompetitorContactsComponent implements OnChanges{
  @Input() competitorId: number = 0
  @Input() contactId: number = 0
  contacts: CompetitorContact_DTO[] = []
  numbers:PhoneNumber_DTO[] = []

  constructor(
    private service: ContactService,
    private appState: AppStateService,
    private namePipe: ContactNamePipe,
    private dialog: MatDialog)
  {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getCompetitorContacts()
  }

  getCompetitorContacts()
  {
    if(this.competitorId > 0)
    {
      let sub = this.service.ListCompetitorContactsForCompetitor(this.competitorId).subscribe(
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
      let sub = this.service.ListCompetitorContactsForContact(this.contactId).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
            this.getPhoneNumbersForCompetitors()
          },
          complete: () =>
          {
            sub.unsubscribe()
          }
        })
    }
  }
  getPhoneNumbersForCompetitors()
  {
    this.contacts.forEach(contact => {
      let sub = this.service.GetPhoneNumbersForContact(contact.competitor?.contactId!).subscribe(
        {
          next: (data) =>
          {
            if(data != null)
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
            if(data != null)
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
    return this.numbers.find(x => x.contactInformationId == id) ??
      new PhoneNumber_DTO()
  }

  onContactDropped(event:any)
  {
    const competitor = this.contacts[0].competitor
    const contact = event.item.data
    this.appState.openSpinner(`Adding ${this.namePipe.transform(contact)} to ${this.namePipe.transform(competitor!.contact!)} as a competitor contact`)
    if(competitor != undefined)
    {
      let sub = this.service.AddCompetitorContact(competitor.id, contact.id).subscribe(
        {
          next: () =>
          {
            this.appState.closeSpinner()
            const message = new Message(MessageType.Success, `${this.namePipe.transform(contact)} was added to ${this.namePipe.transform(competitor!.contact!)} as a competitor contact`, true)
            this.appState.sendAlert(message);
            this.getCompetitorContacts()
          },
          complete: () =>
          {
            sub.unsubscribe
          }
        }
      )
    }
  }

  onDeleteContactClicked(contact: CompetitorContact_DTO)
  {
    console.log("click")
    var config = new MatDialogConfig()
    config.data =
    {
      title: "Delete Contact?",
      text: `Are you sure you want to delete ${this.namePipe.transform(contact.contact!)} from ${this.namePipe.transform(contact.competitor?.contact!)} as a customer contact`,
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
          if( data)
          {
            this.deleteContact(contact)
          }
        },
        complete: () =>
        {
          sub.unsubscribe()
          modalRef.close()
        }
      }
    )
  }

  deleteContact(contact: CompetitorContact_DTO)
  {
    this.appState.openSpinner(`Deleteing ${this.namePipe.transform(contact.contact!)} from ${this.namePipe.transform(contact.competitor?.contact!)} as a customer contact`)
    let sub = this.service.DeleteCompetitorContact(contact).subscribe(
      {
        next: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Success, `${this.namePipe.transform(contact.contact!)} was deleted from ${this.namePipe.transform(contact.competitor?.contact!)}'s customer contacts`, true)
          this.appState.sendAlert(message);
          this.getCompetitorContacts()
        },
        complete: () =>
        {
          sub.unsubscribe
        }
      }
    )
  }
}
