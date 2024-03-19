import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContactService } from '../../contact.service';
import { CustomerContact_DTO, PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { MessageType } from 'src/app/services/message-type.interface';
import { Message } from 'src/app/services/message';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

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
    private namePipe: ContactNamePipe,
    private dialog: MatDialog)
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
    const customer = this.contacts[0].customer
    const contact = event.item.data
    this.appState.openSpinner(`Adding ${this.namePipe.transform(event.item.data)} to ${this.namePipe.transform(customer!.contact!)} as a customer contact`)
    if(customer != undefined)
    {
    let sub = this.service.AddCustomerContact(customer.id, contact.id).subscribe(
      {
        next: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Success, `${this.namePipe.transform(event.item.data)} was added to ${this.namePipe.transform(customer!.contact!)} as a customer contact`, true)
          this.appState.sendAlert(message);
          this.getCustomerContacts()
        },
        complete: () =>
        {
          sub.unsubscribe
        }
      })
    }
  }

  onDeleteContactClicked(contact: CustomerContact_DTO)
  {
    var config = new MatDialogConfig()
    config.data =
    {
      title: "Delete Contact?",
      text: `Are you sure you want to delete ${this.namePipe.transform(contact.contact!)} from ${this.namePipe.transform(contact.customer?.contact!)} as a customer contact`,
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

  deleteContact(contact: CustomerContact_DTO)
  {
    this.appState.openSpinner(`Deleteing ${this.namePipe.transform(contact.contact!)} from ${this.namePipe.transform(contact.customer?.contact!)} as a customer contact`)
    let sub = this.service.DeleteCustomerContact(contact).subscribe(
      {
        next: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Success, `${this.namePipe.transform(contact.contact!)} was deleted from ${this.namePipe.transform(contact.customer?.contact!)}'s customer contacts`, true)
          this.appState.sendAlert(message);
          this.getCustomerContacts()
        },
        complete: () =>
        {
          sub.unsubscribe
        }
      }
    )
  }
}
