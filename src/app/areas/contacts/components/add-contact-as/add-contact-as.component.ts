import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact_DTO } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-add-contact-as',
  templateUrl: './add-contact-as.component.html',
  styleUrls: ['./add-contact-as.component.css']
})
export class AddContactAsComponent {
  businessContactTypes = BusinessContactType
  personContactTypes = PersonContactType
  @Input() contact: Contact_DTO = new Contact_DTO()
  @Output() response: EventEmitter<string | undefined> = new EventEmitter()
  businessTypeSelection: BusinessContactType = BusinessContactType.Customer
  personTypeSelection: PersonContactType = PersonContactType.Customer

  constructor(@Inject(MAT_DIALOG_DATA) data: Contact_DTO) {
    this.contact = data
  }

  ok()
  {
    if(this.contact.isBusiness === true)
    {
      this.response.next(BusinessContactType[this.businessTypeSelection]);
    }
    else
    {
      this.response.next(PersonContactType[this.personTypeSelection]);
    }
  }

  closeDialog(){
    this.response.next(undefined);
  }
}
enum BusinessContactType {
  Competitor,
  Customer,
  Manufacturer,
  Vendor,
  Venue
}

enum PersonContactType{
  Customer,
  Freelancer,
  Employee,
}
