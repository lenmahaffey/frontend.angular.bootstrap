import { Component, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Contact_DTO } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  @Input() contact: Contact_DTO
  @Output() response: Subject<Contact_DTO | null> = new Subject()
  contactFormGroup: any
  title:string
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
    console.log(data)
    this.contact = data
    this.contactFormGroup = new FormGroup(
      {
        isBusiness: new FormControl(data['dto'].isBusiness),
        prefix: new FormControl(data['dto'].prefix),
        firstName: new FormControl(data['dto'].firstName),
        middleName: new FormControl(data['dto'].middleName),
        lastName: new FormControl(data['dto'].lastName),
        suffix: new FormControl(data['dto'].suffix),
        businessName: new FormControl(data['dto'].businessName),
        title: new FormControl(data['dto'].title),
        description: new FormControl(data['dto'].description),
        preferredName: new FormControl(data['dto'].preferredName),
      }
    )
    this.title = this.contact.id == 0 ? "Add New Contact" : "Edit Contact"
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
