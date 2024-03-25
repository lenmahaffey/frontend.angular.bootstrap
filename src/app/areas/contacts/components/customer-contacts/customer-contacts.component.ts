import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContactService } from '../../contact.service';
import { CustomerContact_DTO, PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { MessageType } from 'src/app/services/message-type.interface';
import { Message } from 'src/app/services/message';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';

@Component({
  selector: 'app-customer-contacts',
  templateUrl: './customer-contacts.component.html',
  styleUrls: ['./customer-contacts.component.scss']
})
export class CustomerContactsComponent implements  OnChanges {

  @Input() customerId: number = 0
  @Input() contactId: number = 0
  contacts: CustomerContact_DTO[] = []
  numbers:PhoneNumber_DTO[] = []

  constructor(
    private service: ContactService,
    private appState: AppStateService,
    private namePipe: ContactNamePipe)
  {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getCustomerContacts()
  }

  getCustomerContacts()
  {
    if(this.customerId > 0)
    {
      let sub = this.service.ListCustomerContactsForCustomer(this.customerId).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
            this.getPhoneNumbersForContacts()
          },
          error: () =>
          {
            let message = new Message()
            message.text = "There was an error getting the customer contacts."
            this.appState.sendAlert(message)
          },
          complete: () =>
          {
            sub.unsubscribe()
          }
        })
    }
    else if(this.contactId > 0)
    {
      let sub = this.service.ListCustomerContactsForContact(this.contactId).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
            this.getPhoneNumbersForCustomers()
          },
          error: () =>
          {
            let message = new Message()
            message.text = "There was an error getting the customer contacts."
            this.appState.sendAlert(message)
          },
          complete: () =>
          {
            sub.unsubscribe()
          }
        })
    }
  }

  getPhoneNumbersForCustomers()
  {
    this.contacts.forEach(contact => {
      let sub = this.service.GetPhoneNumbersForContact(contact.customer?.contactId!).subscribe(
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
            message.text = "There was an error getting the phone numbers for the customer contacts."
            this.appState.sendAlert(message)
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
            message.text = "There was an error getting the phone numbers for the customer contacts."
            this.appState.sendAlert(message)
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
    this.appState.openSpinner(`Adding ${this.namePipe.transform(event.item.data)} as a customer contact`)
    if(this.customerId > 0)
    {
    let sub = this.service.AddCustomerContact(this.customerId, contact.id).subscribe(
      {
        next: () =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(event.item.data)} was added as a customer contact`
          this.appState.sendAlert(message);
          this.getCustomerContacts()
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact)} could not be added as a customer contact.`
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

  onDeleteContactClicked(contact: CustomerContact_DTO)
  {
    var config = new ConfirmationDialogOptions()
    config.title = "Delete Contact?"
    config.text = `Are you sure you want to delete ${this.namePipe.transform(contact.contact!)} as a customer contact`
    const sub = this.appState.openConfirmationDialog(config).subscribe(
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

  deleteContact(contact: CustomerContact_DTO)
  {
    this.appState.openSpinner(`Deleteing ${this.namePipe.transform(contact.contact!)} as a customer contact`)
    let sub = this.service.DeleteCustomerContact(contact).subscribe(
      {
        next: () =>
        {
          const message = new Message(MessageType.Success, `${this.namePipe.transform(contact.contact!)} was deleted as a customer contact.`, true)
          this.appState.sendAlert(message);
          this.getCustomerContacts()
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact.contact!)} could not be deleted as a customer contact.`
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
