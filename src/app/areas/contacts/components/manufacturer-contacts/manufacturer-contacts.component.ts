import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { ManufacturerContact_DTO, PhoneNumber_DTO } from 'src/app/shared/api/api.models';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { ContactService } from '../../contact.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manufacturer-contacts',
  templateUrl: './manufacturer-contacts.component.html',
  styleUrls: ['./manufacturer-contacts.component.scss']
})
export class ManufacturerContactsComponent implements OnChanges{
  @Input() manufacturerId: number = 0
  @Input() contactId: number = 0
  contacts: ManufacturerContact_DTO[] = []
  numbers:PhoneNumber_DTO[] = []

  constructor(
    private service: ContactService,
    private appState: AppStateService,
    private namePipe: ContactNamePipe,
    private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getManufacturerContacts()
  }

  getManufacturerContacts()
  {
    if(this.manufacturerId > 0)
    {
      let sub = this.service.ListManufacturerContactsForManufacturer(this.manufacturerId).subscribe(
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
      let sub = this.service.ListManufacturerContactsForContact(this.contactId).subscribe(
        {
          next: (data) =>
          {
            this.contacts = data
            this.getPhoneNumbersForManufacturers()
          },
          complete: () =>
          {
            sub.unsubscribe()
          }
        })
    }
  }

  getPhoneNumbersForManufacturers()
  {
    this.contacts.forEach(contact => {
      let sub = this.service.GetPhoneNumbersForContact(contact.manufacturer?.contactId!).subscribe(
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
    const Manufacturer = this.contacts[0].manufacturer
    const contact = event.item.data
    this.appState.openSpinner(`Adding ${this.namePipe.transform(event.item.data)} to ${this.namePipe.transform(Manufacturer!.contact!)} as a Manufacturer contact`)
    if(Manufacturer != undefined)
    {
    let sub = this.service.AddManufacturerContact(Manufacturer.id, contact.id).subscribe(
      {
        next: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Success, `${this.namePipe.transform(event.item.data)} was added to ${this.namePipe.transform(Manufacturer!.contact!)} as a Manufacturer contact`, true)
          this.appState.sendAlert(message);
          this.getManufacturerContacts()
        },
        complete: () =>
        {
          sub.unsubscribe
        }
      })
    }
  }

  onDeleteContactClicked(contact: ManufacturerContact_DTO)
  {
    var config = new MatDialogConfig()
    config.data =
    {
      title: "Delete Contact?",
      text: `Are you sure you want to delete ${this.namePipe.transform(contact.contact!)} from ${this.namePipe.transform(contact.manufacturer?.contact!)} as a Manufacturer contact`,
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

  deleteContact(contact: ManufacturerContact_DTO)
  {
    this.appState.openSpinner(`Deleteing ${this.namePipe.transform(contact.contact!)} from ${this.namePipe.transform(contact.manufacturer?.contact!)} as a Manufacturer contact`)
    let sub = this.service.DeleteManufacturerContact(contact).subscribe(
      {
        next: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Success, `${this.namePipe.transform(contact.contact!)} was deleted from ${this.namePipe.transform(contact.manufacturer?.contact!)}'s Manufacturer contacts`, true)
          this.appState.sendAlert(message);
          this.getManufacturerContacts()
        },
        complete: () =>
        {
          sub.unsubscribe
        }
      }
    )
  }
}
