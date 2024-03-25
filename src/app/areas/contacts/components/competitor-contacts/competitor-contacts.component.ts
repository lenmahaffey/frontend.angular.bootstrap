import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CompetitorContact_DTO, Contact_DTO, PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { ContactService } from '../../contact.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';

@Component({
  selector: 'app-competitor-contacts',
  templateUrl: './competitor-contacts.component.html',
  styleUrls: ['./competitor-contacts.component.scss']
})
export class CompetitorContactsComponent implements OnChanges{
  @Input() competitorId: number = 0
  @Input() contact: Contact_DTO = new Contact_DTO
  contacts: CompetitorContact_DTO[] = []
  numbers:PhoneNumber_DTO[] = []

  constructor(
    private service: ContactService,
    private appState: AppStateService,
    private namePipe: ContactNamePipe)
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
          error: () =>
          {
            let message = new Message()
            message.text = "There was an error getting the competitor contacts."
            this.appState.sendAlert(message);
          },
          complete: () =>
          {
            sub.unsubscribe()
          }
        })
    }
    else if(this.contact.id > 0)
    {
      let sub = this.service.ListCompetitorContactsForContact(this.contact.id).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
            this.getPhoneNumbersForCompetitors()
          },
          error: () =>
          {
            let message = new Message()
            message.text = "There was an error getting the competitor contacts."
            this.appState.sendAlert(message);
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
          error: () =>
          {
            let message = new Message()
            message.text = "There was an error getting the competitor contact phone numbers."
            this.appState.sendAlert(message);
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
          error: () =>
          {
            let message = new Message()
            message.text = "There was an error getting the competitor contact phone numbers."
            this.appState.sendAlert(message);
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
    const contact = event.item.data
    this.appState.openSpinner(`Adding ${this.namePipe.transform(contact)} as a competitor contact.`)
    if(this.competitorId > 0)
    {
      let sub = this.service.AddCompetitorContact(this.competitorId, contact.id).subscribe(
        {
          next: () =>
          {
            const message = new Message(MessageType.Success)
            message.text = `${this.namePipe.transform(contact)} was added as a competitor contact.`
            this.appState.sendAlert(message);
            this.getCompetitorContacts()
          },
          error: ()=>
          {
            const message = new Message()
            message.text = `${this.namePipe.transform(contact)} could not be added as a competitor contact.`
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

  onDeleteContactClicked(contact: CompetitorContact_DTO)
  {
    var options = new ConfirmationDialogOptions()
    options.title = "Delete Contact?"
    options.text = `Are you sure you want to delete ${this.namePipe.transform(contact.contact!)} as a competitor contact?`
    const sub = this.appState.openConfirmationDialog(options).subscribe(
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
          message.text = "There was an error deleting the contact"
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  deleteContact(contact: CompetitorContact_DTO)
  {
    this.appState.openSpinner(`Deleteing ${this.namePipe.transform(contact.contact!)} as a competitor contact`)
    let sub = this.service.DeleteCompetitorContact(contact).subscribe(
      {
        next: () =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact.contact!)} was deleted as a competitor contact`,
          this.appState.sendAlert(message);
          this.getCompetitorContacts()
        },
        error: () =>
        {
          let message = new Message()
          message.type = MessageType.Error
          message.text = "There was an error deleting the contact"
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
