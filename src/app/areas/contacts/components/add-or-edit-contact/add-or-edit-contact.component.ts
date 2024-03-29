import { Component, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Contact_DTO } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-or-edit-contact.component.html',
  styleUrls: ['./add-or-edit-contact.component.scss']
})
export class AddOrEditContactComponent {
  @Input() contact: Contact_DTO
  @Output() response: Subject<Contact_DTO | null> = new Subject()
  contactFormGroup: any
  title:string
  get firstNameInput() {
    return this.contactFormGroup.get('firstName')
  }
  get lastNameInput(){
    return this.contactFormGroup.get('lastName')
  }
  get isBusinessInput()
  {
    return this.contactFormGroup.get('isBusiness')
  }
  get businessNameInput()
  {
    return this.contactFormGroup.get('businessName')
  }
  private onIsBusinessChange()
  {
    this.isBusinessInput.valueChanges.subscribe(
      {
        next: (data: any) =>
        {
          const validatiors = [Validators.required, Validators.maxLength(50)]
          if(data)
          {
            this.firstNameInput.clearValidators()
            this.lastNameInput.clearValidators()
            this.businessNameInput.addValidators(validatiors)
          }
          else
          {
            this.firstNameInput.addValidators(validatiors)
            this.lastNameInput.addValidators(validatiors)
            this.isBusinessInput.clearValidators()
            this.businessNameInput.clearValidators()
          }
          this.firstNameInput.updateValueAndValidity()
          this.lastNameInput.updateValueAndValidity()
          this.businessNameInput.updateValueAndValidity()
        }
      }
    )
  }

  constructor(@Inject(MAT_DIALOG_DATA) data: Contact_DTO){
    this.contact = data as Contact_DTO
    this.contactFormGroup = new FormGroup(
      {
        isBusiness: new FormControl(this.contact.isBusiness),
        prefix: new FormControl(this.contact.prefix),
        firstName: new FormControl(this.contact.firstName,[
          Validators.required,
          Validators.maxLength(50)
        ]),
        middleName: new FormControl(this.contact.middleName),
        lastName: new FormControl(this.contact.lastName,[
          Validators.required,
          Validators.maxLength(50)
        ]),
        suffix: new FormControl(this.contact.suffix),
        businessName: new FormControl(this.contact.businessName),
        title: new FormControl(this.contact.title),
        description: new FormControl(this.contact.description),
        preferredName: new FormControl(this.contact.preferredName),
      }
    )
    this.title = this.contact.id == 0 ? "Add New Contact" : "Edit Contact"
    this.onIsBusinessChange()
  }

  onKeyDown(event: any)
  {
    if (event.key === "Escape") {
      this.response.next(null)
    }
  }

  submit()
  {
    this.contact.prefix = this.contactFormGroup.value['prefix']
    this.contact.firstName = this.firstNameInput.value
    this.contact.lastName = this.lastNameInput.value
    this.contact.middleName = this.contactFormGroup.value['middleName']
    this.contact.preferredName = this.contactFormGroup.value['preferredName']
    this.contact.suffix = this.contactFormGroup.value['suffix']
    this.contact.businessName = this.contactFormGroup.value['businessName']
    this.contact.title = this.contactFormGroup.value['title']
    this.contact.description = this.contactFormGroup.value['description']
    this.contact.isBusiness = this.isBusinessInput.value ?? false
    this.response.next(this.contact);
  }

  closeModal(){
    this.response.next(null);
  }
}
