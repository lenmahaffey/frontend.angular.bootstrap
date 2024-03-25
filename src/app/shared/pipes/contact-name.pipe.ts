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
    const prefix = contact.prefix != undefined ? contact.prefix : ''
    const firstName = contact.preferredName != undefined ? contact.preferredName : contact.firstName
    const middleName = contact.middleName != undefined ? contact.middleName : ''
    const lastName = contact.lastName
    const suffix = contact.suffix != undefined ? contact.suffix : ''
    let fullName = `${prefix} ${firstName} ${middleName} ${lastName}`
    suffix != undefined ? fullName += ` ${suffix}` : null
    fullName = fullName.trim()
    return fullName
  }

}
