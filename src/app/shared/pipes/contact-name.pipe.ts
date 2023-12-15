import { Pipe, PipeTransform } from '@angular/core';
import { Contact_DTO } from '../api/api.models';

@Pipe({
  name: 'contactName'
})
export class ContactNamePipe implements PipeTransform {

  transform(contact: Contact_DTO): string {
    if(contact.isBusiness)
    {
      return contact.businessName!
    }

    const fullName = `${contact.firstName} ${contact.middleName != null ? contact.middleName : '' } ${contact.lastName} ${contact.suffix != null ? contact.suffix : ''}`
    const preferredName = `${contact.preferredName} ${contact.lastName}`
    if(contact.preferredName != undefined)
    {
      return preferredName
    }
    return fullName
  }

}
