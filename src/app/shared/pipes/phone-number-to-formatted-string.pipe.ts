import { Pipe, PipeTransform } from '@angular/core';
import { PhoneNumber } from '../api/api.models';

@Pipe({
  name: 'phoneNumberFormatter'
})
export class PhoneNumberToFormattedStringPipe implements PipeTransform {

  transform(value: PhoneNumber): string | null {
    if(value?.localNumber != null)
    {
      let prefix = value.localNumber.slice(0,3)
      let localNumber = value.localNumber.slice(3,10)
      let result = `(${value.areaCode}) ${prefix} - ${localNumber}`
      return result;
    }
    else
    {
      return null;
    }
  }
}
