import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CompetitorContact_DTO, Contact_DTO, PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { ContactService } from '../../contact.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';
import { take } from 'rxjs';
import { SpinnerOptions } from 'src/app/shared/spinner/SpinnerOptions';

@Component({
    selector: 'app-competitor-contacts',
    templateUrl: './competitor-contacts.component.html',
    styleUrls: ['./competitor-contacts.component.scss'],
    standalone: false
})
export class CompetitorContactsComponent implements OnChanges{
  @Input() competitorId = 0
  @Input() contact: Contact_DTO = new Contact_DTO
  @Output() update: EventEmitter<boolean> = new EventEmitter()
  contacts: CompetitorContact_DTO[] = []
  numbers:PhoneNumber_DTO[] = []

  constructor(
    private service: ContactService,
    private appState: AppStateService,
    private namePipe: ContactNamePipe)
  {}

  ngOnChanges(): void {
    this.getCompetitorContacts()
  }

  getCompetitorContacts()
  {
    if(this.competitorId > 0)
    {
      this.service.ListCompetitorContactsForCompetitor(this.competitorId).pipe(take(1)).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
            this.getPhoneNumbersForContacts()
          },
          error: () =>
          {
            const message = new Message()
            message.text = "There was an error getting the competitor contacts."
            this.appState.sendAlert(message);
          },
        })
    }
    else if(this.contact.id > 0)
    {
      this.service.ListCompetitorContactsForContact(this.contact.id).pipe(take(1)).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
            this.getPhoneNumbersForCompetitors()
          },
          error: () =>
          {
            const message = new Message()
            message.text = "There was an error getting the competitor contacts."
            this.appState.sendAlert(message);
          },
        })
    }
  }

  getPhoneNumbersForCompetitors()
  {
    this.contacts.forEach(contact => {
      this.service.GetPhoneNumbersForContact(contact.competitor!.contactId).pipe(take(1)).subscribe(
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
            const message = new Message()
            message.text = "There was an error getting the competitor contact phone numbers."
            this.appState.sendAlert(message);
          },
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
            const message = new Message()
            message.text = "There was an error getting the competitor contact phone numbers."
            this.appState.sendAlert(message);
          },
        })
    });
  }

  getNumber(id: number) : PhoneNumber_DTO
  {
    return this.numbers.find(x => x.contactId == id) ??
      new PhoneNumber_DTO()
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
    this.appState.openSpinner(new SpinnerOptions(`Adding ${this.namePipe.transform(contact)} as a competitor contact.`))
    if(this.competitorId > 0)
    {
      this.service.AddCompetitorContact(this.competitorId, contact.id).pipe(take(1)).subscribe(
        {
          next: () =>
          {
            this.update.next(true)
            const message = new Message(MessageType.Success)
            message.text = `${this.namePipe.transform(contact)} was added as a competitor contact.`
            this.appState.sendAlert(message);
            this.getCompetitorContacts()
          },
          error: () =>
          {
            const message = new Message()
            message.text = `${this.namePipe.transform(contact)} could not be added as a competitor contact.`
            this.appState.sendAlert(message);
          },
        })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
    }
  }

  openDeleteContactDialog(contact: CompetitorContact_DTO)
  {
    const options = new ConfirmationDialogOptions()
    options.title = "Delete Contact?"
    options.text = `Are you sure you want to delete ${this.namePipe.transform(contact.contact!)} as a competitor contact?`
    this.appState.openConfirmationDialog(options).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          if(data)
          {
            this.deleteContact(contact)
          }
        }
      })
  }

  deleteContact(contact: CompetitorContact_DTO)
  {
    this.appState.openSpinner(new SpinnerOptions(`Deleteing ${this.namePipe.transform(contact.contact!)} as a competitor contact`))
    this.service.DeleteCompetitorContact(contact).pipe(take(1)).subscribe(
      {
        next: () =>
        {
          this.update.next(true)
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact.contact!)} was deleted as a competitor contact`,
          this.appState.sendAlert(message);
          this.getCompetitorContacts()
        },
        error: () =>
        {
          const message = new Message()
          message.type = MessageType.Error
          message.text = "There was an error deleting the contact"
        }
      })
    .add(() =>
    {
      this.appState.closeSpinner()
    })
  }
}
