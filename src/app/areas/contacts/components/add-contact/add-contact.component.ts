import { Component, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
            console.log('is a business')
            this.firstNameInput.clearValidators()
            this.lastNameInput.clearValidators()
            this.businessNameInput.addValidators(validatiors)
          }
          else
          {
            console.log('is not a business')
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
    this.contact = data['dto']
    this.contactFormGroup = new FormGroup(
      {
        isBusiness: new FormControl(data['dto'].isBusiness),
        prefix: new FormControl(data['dto'].prefix),
        firstName: new FormControl(data['dto'].firstName,[
          Validators.required,
          Validators.maxLength(50)
        ]),
        middleName: new FormControl(data['dto'].middleName),
        lastName: new FormControl(data['dto'].lastName,[
          Validators.required,
          Validators.maxLength(50)
        ]),
        suffix: new FormControl(data['dto'].suffix),
        businessName: new FormControl(data['dto'].businessName),
        title: new FormControl(data['dto'].title),
        description: new FormControl(data['dto'].description),
        preferredName: new FormControl(data['dto'].preferredName),
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
