import { Component, Output } from '@angular/core';
import { Contact_DTO } from 'src/app/shared/api/api.models';
import { ContactService } from '../contact.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss']
})
export class ListContactsComponent {

  searchFormGroup: any
  filteredList: Contact_DTO[] = []
  data: Contact_DTO[] = []
  @Output() contact:Contact_DTO | undefined = undefined

  constructor(service: ContactService)
  {
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
            this.contact = data[1]
          }
      }
    )
  }
  contactClicked(contact:Contact_DTO)
  {
    this.contact = contact
  }

  filterContacts()
  {
    var fName = this.searchFormGroup.value['firstName']
    var lName = this.searchFormGroup.value['lastName']
    if(fName == "" && lName == "")
    {
      this.filteredList = this.data;
      return;
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
        console.log(x.lastName)
        if(x.lastName.includes(lName))
        {
          return true
        }
          return false
    }
    ))

    // console.log(this.data.filter(x => {
    //   if(x.firstName != null)
    //     if(x.firstName.includes(fName))
    //     {
    //       return true
    //     }
    //       return false
    // }
    // ))
    // console.log(fName)
    // this.filteredList = this.data.filter(x =>{
    //   if(x.firstName != null)
    //     x.firstName.includes(fName)
    // })

    // this.filteredList = this.data.filter(x => x.firstName.includes(fName))
    // this.filteredList = this.data.filter(x => x.lastName.includes(lName))
    // console.log(this.filteredList)
    // if(filter == null)
    // {
    //   this.filteredList = this.data
    // }
    // else
    // {
    //   this.filteredList = this.filteredList.filter(x => x.lastName.includes(filter))
    // }
  }
}
