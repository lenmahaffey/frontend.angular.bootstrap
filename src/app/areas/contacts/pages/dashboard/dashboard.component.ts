import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Contact_DTO } from 'src/app/shared/api/api.models';
import { ListContactsComponent } from '../../components/list-contacts/list-contacts.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(ListContactsComponent) list!: ListContactsComponent
  @Input() id: undefined | number
  selectedContactId = 100

  constructor(private router: Router)
  {
  }
  ngOnInit(): void {
    if(this.id == undefined)
    {
      this.router.navigate([`contacts/dashboard/${this.selectedContactId}`])
    }
    else
    {
      this.selectedContactId = this.id
    }
  }

  onContactSelected(contactId: number)
  {
    this.router.navigate([`contacts/dashboard/${contactId}`])
    this.selectedContactId = contactId
  }

  onContactUpdated(updatedContact: Contact_DTO)
  {
    this.list.listAllContacts()
    console.log(updatedContact)
  }
}
