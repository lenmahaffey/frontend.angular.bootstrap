import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact_DTO } from 'src/app/shared/api/api.models';
import { ContactService } from '../../contact.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AddOrEditContactComponent } from '../add-or-edit-contact/add-or-edit-contact.component';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss']
})
export class ListContactsComponent {

  filterOptions: any
  sortOptions: string = ""
  searchFormGroup: any
  filteredList: Contact_DTO[] = []
  contactList: Contact_DTO[] = []
  @Output() contact = new EventEmitter<Contact_DTO>()
  private _updatedContact: Contact_DTO = new Contact_DTO()
  get updatedContact()
  {
      return this._updatedContact
  }
  @Input() set updatedContact(value: Contact_DTO)
  {
    console.log(value)
    this._updatedContact = value
    let i = this.contactList.findIndex(x => x.id == value.id)
    this.contactList[i] = value
  }
  constructor(
     private service: ContactService,
     private appState: AppStateService,
     private namePipe: ContactNamePipe)
  {
    this.filterOptions = new  FormGroup(
      {
        employees: new FormControl(false),
        freelancers: new FormControl(false),
        customers: new FormControl(false),
        users: new FormControl(false),
      }
    )
    this.searchFormGroup = new FormGroup(
      {
        firstName: new FormControl(""),
        lastName: new FormControl(""),
      }
    )
    this.listAllContacts(true)
  }

  listAllContacts(spinner: boolean = false, contactId: number = 0)
  {
    if(spinner)
    {
      this.appState.openSpinner("Getting Contacts")
    }
    const sub = this.service.listAllContacts(true).subscribe(
      {
        next: (data) =>
          {
            this.contactList = data
            this.filteredList = data
            this.sortContacts()
            this.filterContacts()
            if(contactId != 0)
            {
              this.contactList.forEach((x, i) =>
              {
                if(x.id == contactId)
                {
                  this.contact.next(data[i])
                }
              })
            }
            this.appState.closeSpinner()
          },
        error: () =>
        {
          this.appState.sendAlert(new Message())
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  contactClicked(contact:Contact_DTO)
  {
    this.contact.next(contact)
  }

  searchContacts()
  {
    var fName = this.searchFormGroup.value.firstName
    var lName = this.searchFormGroup.value.lastName
    if(fName === "" && lName === "")
    {
      this.filteredList = this.contactList;
      this.sortContacts();
      return
    }
      this.filteredList = (this.filteredList.filter(x => {
        if(x.firstName != null)
          if(x.firstName.includes(fName))
          {
            return true
          }
            return false
      }
      ))
      this.filteredList = (this.filteredList.filter(x => {
        if(x.lastName != null)
          if(x.lastName.includes(lName))
          {
            return true
          }
            return false
      }
      ))
      this.sortContacts();
  }

  sortContacts()
  {
    var fName = this.sortOptions === "firstName"
    var lName = this.sortOptions === "lastName"
    var bName = this.sortOptions === "businessName"

    if(fName)
    {
      this.filteredList.sort(function (a, b) {
        if(a.businessName == null)
        {
            return -1;
        }
        return 0
      });
      this.filteredList.sort(function (a, b) {
        if (a.lastName! < b.lastName!) {
          return -1;
        }
        if (a.lastName! > b.lastName!) {
          return 1;
        }
        return 0;
      });

      this.filteredList.sort(function (a, b) {
        if (a.firstName! < b.firstName!) {
          return -1;
        }
        if (a.firstName! > b.firstName!) {
          return 1;
        }
        return 0;
      });

    }

    if(lName)
    {
      this.filteredList.sort(function (a, b) {
        if(a.businessName == null)
        {
            return -1;
        }
        return 0
      });
      this.filteredList.sort(function (a, b) {
        if (a.firstName! < b.firstName!) {
          return -1;
        }
        if (a.firstName! > b.firstName!) {
          return 1;
        }
        return 0;
      });

      this.filteredList.sort(function (a, b) {
        if (a.lastName! < b.lastName!) {
          return -1;
        }
        if (a.lastName! > b.lastName!) {
          return 1;
        }
        return 0;
      });

    }

    if(bName)
    {
      this.filteredList.sort(function (a, b) {
        if (a.firstName! < b.firstName!) {
          return -1;
        }
        if (a.firstName! > b.firstName!) {
          return 1;
        }
        return 0;
      });

      this.filteredList.sort(function (a, b) {
        if (a.lastName! < b.lastName!) {
          return -1;
        }
        if (a.lastName! > b.lastName!) {
          return 1;
        }
        return 0;
      });

      this.filteredList.sort(function (a, b) {
        if(a.businessName != null)
        {
            return -1;
        }
        return 0
      });
    }
  }

  filterContacts()
  {
    var employees = this.filterOptions.value.employees
    var freelancers = this.filterOptions.value.freelancers
    var users = this.filterOptions.value.users
    var customers = this.filterOptions.value.customers
    if(customers | freelancers | users | employees)
    {
      this.filteredList = (this.filteredList.filter(x => {
        if(customers)
          if(x.customerId != null)
          {
            return true
          }
        if(freelancers)
          if(x.freelancerId != null)
          {
            return true
          }
        if(employees)
          if(x.employeeId !=  null)
          {
            return true
          }
        return false
        }
      ))
    }
    else
    {
      this.filteredList = this.contactList
    }
  }

  openAddContactModal(){
    var dto = new Contact_DTO()
    dto.id = 0
    let config = Constants.GetModalConfig();
    config.position =
    {
      top: '7%'
    }
    config.minWidth = undefined
    let modalRef = this.appState.openDialog(AddOrEditContactComponent, dto, config);
    let sub = modalRef.subscribe(
      {
        next: (data) =>
        {
          if(data != null)
          {
            this.addContact(data)
          }
          sub.unsubscribe()
        },
        error: () =>
        {
          this.appState.sendAlert(new Message())
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  addContact(contact: Contact_DTO)
  {
    this.appState.openSpinner(`Adding ${this.namePipe.transform(contact)} to contact list`);
    const sub = this.service.AddContact(contact).subscribe(
      {
        next: () =>
        {
          this.appState.closeSpinner()
          const message = new Message(MessageType.Success, `${this.namePipe.transform(contact)} was added to the contact list`)
          this.appState.sendAlert(message)
          this.listAllContacts(false)
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact)} could not be added.`
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  onDeleteContactClicked(contact: Contact_DTO)
  {
    var config = new ConfirmationDialogOptions()
    config.title = "Delete Contact?"
    config.text = `Are you sure you want to delete ${this.namePipe.transform(contact)}`
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
          message.text = "There was an error deleting the contact"
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  deleteContact(contact: Contact_DTO)
  {
    this.appState.openSpinner("Deleteing Contact")
    const sub = this.service.DeleteContact(contact).subscribe(
      {
        next: (data) =>
        {
          const i = this.contactList.indexOf(contact)
          this.contactList.splice(i, 1)
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact)} has been deleted`
          this.appState.sendAlert(message)
          this.contact.next(this.contactList[0])
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact)} could not be deleted`
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          this.appState.closeSpinner()
          sub.unsubscribe()
        }
      }
    )
  }

  onEditContactClicked(contact: Contact_DTO)
  {
    let config = Constants.GetModalConfig();
    config.position =
    {
      top: '7%'
    }
    config.minWidth = undefined
    let modalRef = this.appState.openDialog(AddOrEditContactComponent, contact, config);
    let sub = modalRef.subscribe(
      {
        next: (data) =>
        {
          this.updateContact(data)
          this.appState.closeDialog()
        },
        error: () =>
        {
          this.appState.sendAlert(new Message())
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  updateContact(contact: Contact_DTO){
    let sub = this.service.UpdateContact(contact).subscribe(
      {
        next: (data) =>
        {
          let message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(data)} was successfully updated.`
          this.appState.sendAlert(message)
          const i = this.contactList.findIndex(x => x.id == contact.id)
          this.contactList[i] = data
        },
        error: () =>
        {
          let message = new Message(MessageType.Error)
          message.text = `There was an error updating ${this.namePipe.transform(contact)}`
          this.appState.sendAlert(message)
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      }
    )
  }

  onAddContactAsClicked(contact: Contact_DTO)
  {

  }

  addContactAs(contact: Contact_DTO)
  {

  }
}
