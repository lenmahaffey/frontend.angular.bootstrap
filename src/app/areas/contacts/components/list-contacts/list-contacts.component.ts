import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact_DTO } from 'src/app/shared/api/api.models';
import { ContactService } from '../../contact.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AddContactModalComponent } from '../contact-modal/add-contact.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';

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

  getUpdatedContact()
  {
    return this._updatedContact
  }

  @Input() setUpdatedContact()
  {
    this.listAllContacts()
  }
  private _updatedContact: Contact_DTO | undefined
  constructor(private alertService: AlertService,
     private service: ContactService,
     private _dialog: MatDialog,
     private appStateService: AppStateService,
     private namePipe: ContactNamePipe,
     private crd: ChangeDetectorRef)
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
      this.appStateService.openSpinner("Getting Contacts")
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
            this.appStateService.closeSpinner()
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
          if(x.customer != null)
          {
            return true
          }
        if(freelancers)
          if(x.freelancer != null)
          {
            return true
          }
        if(employees)
          if(x.employee != null)
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

  openModal()
  {
    var config = new MatDialogConfig()
    var dto = new Contact_DTO()
    dto.id = 0
    config.data =
    {
      dto: dto
    }
    config.disableClose = false;
    config.position =
    {
      top: "5%"
    }
    let modalRef = this._dialog.open(AddContactModalComponent, config);
    let sub = modalRef.componentInstance.response.subscribe(
      {
        next: (data) =>
        {
          if(data != null)
          {
            this.addContact(data)
          }
          modalRef.close()
          sub.unsubscribe()
        }
      }
    )
  }

  addContact(contact: Contact_DTO)
  {
    const sub = this.service.AddContact(contact).subscribe(
      {
        next: () =>
        {
          this.listAllContacts(false)
        }
      }
    )
  }

  onDeleteContactClicked(contact: Contact_DTO)
  {
    var config = new MatDialogConfig()
    config.data =
    {
      title: "Delete Contact?",
      text: `Are you sure you want to delete ${this.namePipe.transform(contact)}`,
      dto: this.contact,
      noButtonText: "No",
      yesButtonText: "Yes"
    }
    config.disableClose = false;
    config.position =
    {
      top: "5%"
    }
    let modalRef = this._dialog.open(ConfirmationDialogComponent, config);
    const sub = modalRef.componentInstance.response.subscribe(
      {
        next: (data) =>
        {
          if(data)
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

  deleteContact(contact: Contact_DTO)
  {
    this.appStateService.openSpinner("Deleteing Contact")
    const sub = this.service.DeleteContact(contact).subscribe(
      {
        next: (data) =>
        {
          const i = this.contactList.indexOf(contact)
          this.contactList.splice(i, 1)
          this.alertService.sendAlert(new Message(MessageType.Success, `${this.namePipe.transform(contact)} has been deleted`))
          this.contact.next(this.contactList[0])
        },
        // error: () =>
        // {
        //   this.alertService.sendAlert(new Message(MessageType.Error, `${this.namePipe.transform(contact)} could not be deleted`))
        // },
        complete: () =>
        {
          this.appStateService.closeSpinner()
          sub.unsubscribe()
        }
      }
    )
  }

  onEditContactClicked(contact: Contact_DTO){
    var config = new MatDialogConfig()
    var dto = contact
    config.data =
    {
      dto: dto
    }
    config.disableClose = false;
    config.position =
    {
      top: "5%"
    }
    let modalRef = this._dialog.open(AddContactModalComponent, config);
    let sub = modalRef.componentInstance.response.subscribe(
      {
        next: (data) =>
        {
          if(data != null)
          {
            this.updateContact(data)
          }
          modalRef.close()
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
          let message = new Message()
          if(data)
          {
            this.listAllContacts(true, contact.id)
            message.text = `${this.namePipe.transform(data)} was successfully updated.`
            message.type = MessageType.Success
            message.autoDismiss = true
            this.alertService.sendAlert(message)
          }
          else
          {

          }
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
