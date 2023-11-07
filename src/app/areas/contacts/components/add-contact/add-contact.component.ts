import { Component, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Contact_DTO } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  @Output() response: Subject<Contact_DTO | null> = new Subject()
  contactFormGroup: any

  constructor(){
    this.contactFormGroup = new FormGroup(
      {
        isBusiness: new FormControl(false),
        prefix: new FormControl(null),
        firstName: new FormControl(null),
        middleName: new FormControl(null),
        lastName: new FormControl(null),
        suffix: new FormControl(null),
        businessName: new FormControl(null),
        title: new FormControl(null),
        description: new FormControl(null),
        preferredName: new FormControl(null),
      }
    )
  }
  onKeyDown(event: any)
  {
    if (event.key === "Escape") {
      this.response.next(null)
    }
  }
  submit()
  {
    var newContact = new Contact_DTO()
    newContact.prefix = this.contactFormGroup.value['prefix']
    newContact.firstName = this.contactFormGroup.value['firstName']
    newContact.lastName = this.contactFormGroup.value['lastName']
    newContact.middleName = this.contactFormGroup.value['middleName']
    newContact.preferredName = this.contactFormGroup.value['preferredName']
    newContact.suffix = this.contactFormGroup.value['suffix']
    newContact.businessName = this.contactFormGroup.value['businessName']
    newContact.title = this.contactFormGroup.value['title']
    newContact.description = this.contactFormGroup.value['description']
    this.response.next(newContact);
  }
  closeModal(){
    this.response.next(null);
  }
}
