import { Pipe, PipeTransform } from '@angular/core';
import { PhoneNumber_DTO } from '../api/api.models';

@Pipe({
  name: 'phoneNumberToString'
})
export class PhoneNumberToFormattedStringPipe implements PipeTransform {

  transform(value: PhoneNumber_DTO): string | null {
    if(value?.localNumber != null)
    {
      let result = `(${value.areaCode}) ${value.prefix}-${value.localNumber}`
      return result;
    }
    else
    {
      return null;
    }
  }
}
