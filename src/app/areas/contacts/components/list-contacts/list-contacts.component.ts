import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact_DTO } from 'src/app/shared/api/api.models';
import { ContactService } from '../../contact.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AddOrEditContactComponent } from '../add-or-edit-contact/add-or-edit-contact.component';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';
import { Constants } from 'src/app/constants';
import { take } from 'rxjs';
import { AddContactAsComponent } from '../add-contact-as/add-contact-as.component';
import { CustomerService } from 'src/app/areas/customers/customer.service';
import { FreelancerService } from 'src/app/areas/freelancers/freelancer.service';
import { EmployeesService } from 'src/app/areas/employees/employees.service';
import { SalesService } from 'src/app/areas/sales/sales.service';
import { InventoryService } from 'src/app/areas/inventory/inventory.service';
import { EventsService } from 'src/app/areas/events/events.service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss']
})
export class ListContactsComponent {

  filterOptions: any
  sortOptions = ""
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
    this._updatedContact = value
    const i = this.contactList.findIndex(x => x.id == value.id)
    this.contactList[i] = value
  }
  constructor(
     private service: ContactService,
     private appState: AppStateService,
     private namePipe: ContactNamePipe,
     private customerService: CustomerService,
     private freelancerService: FreelancerService,
     private employeeService: EmployeesService,
     private salesService: SalesService,
     private eventService: EventsService,
     private inventoryService: InventoryService)
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

  listAllContacts(spinner = false, contactId = 0)
  {
    if(spinner)
    {
      this.appState.openSpinner("Getting Contacts")
    }
    this.service.listAllContacts(true).pipe(take(1)).subscribe(
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
          },
        error: () =>
        {
          this.appState.sendAlert(new Message())
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }

  contactClicked(contact:Contact_DTO)
  {
    this.contact.next(contact)
  }

  searchContacts()
  {
    const fName = this.searchFormGroup.value.firstName
    const lName = this.searchFormGroup.value.lastName
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
    const fName = this.sortOptions === "firstName"
    const lName = this.sortOptions === "lastName"
    const bName = this.sortOptions === "businessName"

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
    const employees = this.filterOptions.value.employees
    const freelancers = this.filterOptions.value.freelancers
    const users = this.filterOptions.value.users
    const customers = this.filterOptions.value.customers
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

  openAddContactDialog(){
    const dto = new Contact_DTO()
    dto.id = 0
    const config = Constants.GetDialogConfig();
    config.position =
    {
      top: '7%'
    }
    config.minWidth = undefined
    const dialogRef = this.appState.openDialog(AddOrEditContactComponent, dto, config);
    dialogRef.pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          if(data != null)
          {
            this.addContact(data)
          }
          else{
            this.appState.closeDialog()
          }
        }
      })
  }

  addContact(contact: Contact_DTO)
  {
    this.appState.openSpinner(`Adding ${this.namePipe.transform(contact)} to contact list`);
    this.service.AddContact(contact).pipe(take(1)).subscribe(
      {
        next: () =>
        {
          const message = new Message(MessageType.Success, `${this.namePipe.transform(contact)} was added to the contact list`)
          this.appState.sendAlert(message)
          this.listAllContacts(false)
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact)} could not be added.`
          this.appState.sendAlert(message)
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }

  openDeleteContactDialog(contact: Contact_DTO)
  {
    const config = new ConfirmationDialogOptions()
    config.title = "Delete Contact?"
    config.text = `Are you sure you want to delete ${this.namePipe.transform(contact)}`
    this.appState.openConfirmationDialog(config).pipe(take(1)).subscribe(
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

  deleteContact(contact: Contact_DTO)
  {
    this.appState.openSpinner("Deleteing Contact")
    this.service.DeleteContact(contact).pipe(take(1)).subscribe(
      {
        next: () =>
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
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()

      })
  }

  openEditContactDialog(contact: Contact_DTO)
  {
    const config = Constants.GetDialogConfig();
    config.position =
    {
      top: '7%'
    }
    config.minWidth = undefined
    const dialogRef = this.appState.openDialog(AddOrEditContactComponent, contact, config);
    dialogRef.pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          if(data != undefined)
          {
            this.updateContact(data)
            this.appState.closeDialog()
          }
          else{
            this.appState.closeDialog()
          }
        }
      })
  }

  updateContact(contact: Contact_DTO){
    this.appState.openSpinner("Updating Contact")
    this.service.UpdateContact(contact).subscribe(
      {
        next: (data) =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(data)} was successfully updated.`
          this.appState.sendAlert(message)
          const i = this.contactList.findIndex(x => x.id == contact.id)
          this.contactList[i] = data
        },
        error: () =>
        {
          const message = new Message(MessageType.Error)
          message.text = `There was an error updating ${this.namePipe.transform(contact)}`
          this.appState.sendAlert(message)
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }

  openAddContactAsDialog(contact: Contact_DTO)
  {
    this.appState.openDialog(AddContactAsComponent, contact).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          if(data)
          {
            this.addContactAs(contact, data)
          }
            this.appState.closeDialog()
        },
        error: () =>
        {
          this.appState.sendAlert(new Message())
        }
      })
  }

  addContactAs(contact: Contact_DTO, type: string)
  {
    switch (type){
      case "Customer":
        this.createNewCustomer(contact)
        break
      case "Competitor":
        this.createNewCompetitor(contact)
        break
      case "Employee":
        this.createNewEmployee(contact)
        break
      case "Freelancer":
        this.createNewFreelancer(contact)
        break
      case "Manufacturer":
        this.createNewManufacturer(contact)
        break
      case "User":
        break
      case "Vendor":
        this.createNewVendor(contact)
        break
      case "Venue":
        this.createNewVenue(contact)
        break
      default:
        break
    }
  }
  createNewCustomer(contact:Contact_DTO)
  {
    this.appState.openSpinner(`Adding ${this.namePipe.transform(contact)} as a new customer`)
    const contactIndex = this.contactList.findIndex(x => x.id === contact.id)
    this.customerService.CreateNewCustomer(contact.id).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact)} was added as a new customer`

          contact.customerId = data.id
          this.contact.next(contact)
          this.contactList[contactIndex].customerId = data.id
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact)} could not be added as a new customer`
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }
  createNewFreelancer(contact:Contact_DTO)
  {
    this.appState.openSpinner(`Adding ${this.namePipe.transform(contact)} as a new freelancer`)
    const contactIndex = this.contactList.findIndex(x => x.id === contact.id)
    this.freelancerService.CreateNewFreelancer(contact.id).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact)} was added as a new freelancer`

          contact.freelancerId = data.id
          this.contact.next(contact)
          this.contactList[contactIndex].freelancerId = data.id
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact)} could not be added as a new freelancer`
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }
  createNewEmployee(contact:Contact_DTO)
  {
    this.appState.openSpinner(`Adding ${this.namePipe.transform(contact)} as a new employee`)
    const contactIndex = this.contactList.findIndex(x => x.id === contact.id)
    this.employeeService.CreateNewEmployee(contact.id).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact)} was added as a new Employee`

          contact.employeeId = data.id
          this.contact.next(contact)
          this.contactList[contactIndex].employeeId = data.id
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact)} could not be added as a new Employee`
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }

  createNewCompetitor(contact:Contact_DTO)
  {
    this.appState.openSpinner(`Adding ${this.namePipe.transform(contact)} as a new competitor`)
    const contactIndex = this.contactList.findIndex(x => x.id === contact.id)
    this.salesService.createNewCompetitor(contact.id).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact)} was added as a new competitor`

          contact.competitorId = data.id
          this.contact.next(contact)
          this.contactList[contactIndex].competitorId = data.id
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact)} could not be added as a new competitor`
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }

  createNewManufacturer(contact:Contact_DTO)
  {
    this.appState.openSpinner(`Adding ${this.namePipe.transform(contact)} as a new manufacturer`)
    const contactIndex = this.contactList.findIndex(x => x.id === contact.id)
    this.inventoryService.CreateNewManufacturer(contact.id).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact)} was added as a new manufacturer`

          contact.manufacturerId = data.id
          this.contact.next(contact)
          this.contactList[contactIndex].manufacturerId = data.id
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact)} could not be added as a new manufacturer`
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }

  createNewVendor(contact:Contact_DTO)
  {
    this.appState.openSpinner(`Adding ${this.namePipe.transform(contact)} as a new vendor`)
    const contactIndex = this.contactList.findIndex(x => x.id === contact.id)
    this.inventoryService.CreateNewVendor(contact.id).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact)} was added as a new vendor`
          contact.vendorId = data.id
          this.contact.next(contact)
          this.contactList[contactIndex].vendorId = data.id
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact)} could not be added as a new vendor`
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }

  createNewVenue(contact:Contact_DTO)
  {
    this.appState.openSpinner(`Adding ${this.namePipe.transform(contact)} as a new Venue`)
    const contactIndex = this.contactList.findIndex(x => x.id === contact.id)
    this.eventService.CreateNewVenue(contact.id).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(contact)} was added as a new Venue`

          contact.venueId = data.id
          this.contact.next(contact)
          this.contactList[contactIndex].venueId = data.id
        },
        error: () =>
        {
          const message = new Message()
          message.text = `${this.namePipe.transform(contact)} could not be added as a new Venue`
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }
}
