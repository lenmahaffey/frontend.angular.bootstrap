import { Component, Output } from '@angular/core';
import { Contact_DTO } from 'src/app/shared/api/api.models';
import { ContactService } from '../../contact.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AddContactComponent } from '../../components/add-contact/add-contact.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

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
  data: Contact_DTO[] = []
  @Output() contact:Contact_DTO | undefined = undefined

  constructor(private service: ContactService, private _dialog: MatDialog)
  {
    this.filterOptions = new  FormGroup(
      {
        employees: new FormControl(false),
        freelancers: new FormControl(false),
        customers: new FormControl(false),
        users: new FormControl(false),
      }
    )
    // this.sortOptions = new  FormGroup(
    //   {
    //     firstName: new FormControl(false),
    //     lastName: new FormControl(true),
    //     businessName: new FormControl(false),
    //   }
    // )
    this.searchFormGroup = new FormGroup(
      {
        firstName: new FormControl(""),
        lastName: new FormControl(""),
      }
    )
    const sub = service.listAllContacts().subscribe(
      {
        next: (data) =>
          {
            this.data = data
            this.filteredList = data
            this.sortContacts()
            this.filterContacts()
            this.contact = data[1]
          }
      }
    )
  }

  contactClicked(contact:Contact_DTO){
    this.contact = contact
  }

  searchContacts()
  {
    var fName = this.searchFormGroup.value.firstName
    var lName = this.searchFormGroup.value.lastName
    if(fName === "" && lName === "")
    {
      this.filteredList = this.data;
      this.sortContacts();
      this.filterContacts();
      return
    }
      this.filteredList = (this.data.filter(x => {
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
      this.filterContacts();
  }

  sortContacts()
  {
    var fName = this.sortOptions === "firstName"
    var lName = this.sortOptions === "lastName"
    var bName = this.sortOptions === "businessName"
    console.log(fName)
    console.log(lName)
    console.log(bName)


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
    // }

    // if(employees)
    // {
    //   this.filteredList = (this.data.filter(x => {
    //       if(x.employeeId != null)
    //       {
    //         return true
    //       }
    //         return false
    //   }
    //   ))
    // }

    // if(freelancers)
    //   this.filteredList = (this.data.filter(x => {
    //       if(x.freelancerId != null)
    //       {
    //         return true
    //       }
    //         return false
    //   }
    //   ))

    // if(users)
    // {
    //   this.filteredList = (this.data.filter(x => {
    //       if(x.userId != null)
    //       {
    //         return true
    //       }
    //         return false
    //   }
    //   ))
    // }
  }

  openModal()
  {
    const bodyRect = document.body.getBoundingClientRect();
    var config = new MatDialogConfig()
    config.data =
    {
      title: "Demostration Modal",
      text: "This is a modal",
      yesButtonText: "yes",
      noButtonText: "no",
    }
    config.minWidth = '400px'
    config.disableClose = false;
    config.position =
    {
      left: ((bodyRect.width / 2) - (Number(config.minWidth.replace("px", "")))).toString() + "px",
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
          console.log(data);
        }
      }
    )
  }
}
