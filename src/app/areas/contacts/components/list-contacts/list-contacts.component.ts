import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact_DTO } from 'src/app/shared/api/api.models';
import { ContactService } from '../../contact.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AppStateService } from 'src/app/services/app-state/app-state-service';

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
  @Input() data: Contact_DTO[] = []
  @Output() contact = new EventEmitter<Contact_DTO>()

  constructor(private service: ContactService, private _dialog: MatDialog, private appStateService: AppStateService)
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
    const config:MatDialogConfig = new MatDialogConfig()
    config.data =
    {
      message: "Getting Contacts",
    }
    this.appStateService.openSpinner(config)
    const sub = service.listAllContacts(false).subscribe(
      {
        next: (data) =>
          {
            this.data = data
            this.filteredList = data
            this.sortContacts()
            this.filterContacts()
            this.contact.next(data[1])
            this.appStateService.closeSpinner()
          }
      }
    )
  }

  contactClicked(contact:Contact_DTO){
    this.contact.next(contact)
  }

  searchContacts()
  {
    var fName = this.searchFormGroup.value.firstName
    var lName = this.searchFormGroup.value.lastName
    if(fName === "" && lName === "")
    {
      this.filteredList = this.data;
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
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) {
          return 1;
        }
        return 0;
      });

      this.filteredList.sort(function (a, b) {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
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
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });

      this.filteredList.sort(function (a, b) {
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) {
          return 1;
        }
        return 0;
      });

    }

    if(bName)
    {
      this.filteredList.sort(function (a, b) {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });

      this.filteredList.sort(function (a, b) {
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) {
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
          if(x.employeeId != null)
          {
            return true
          }
        if(users)
          if(x.userId != null)
          {
            return true
          }
        return false
        }
      ))
    }
    else
    {
      this.filteredList = this.data
    }
  }

  openModal()
  {
    var config = new MatDialogConfig()
    config.data =
    {
      title: "Demostration Modal",
      text: "This is a modal",
      yesButtonText: "yes",
      noButtonText: "no",
    }
    config.disableClose = false;
    config.position =
    {
      top: "5%"
    }
    let modalRef = this._dialog.open(AddContactComponent, config);
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
        next: (data) =>
        {
          //console.log(data);
        }
      }
    )
  }
}
