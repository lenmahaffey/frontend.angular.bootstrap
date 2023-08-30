import { Pipe, PipeTransform } from '@angular/core';
import { PhoneNumber } from '../api/api.models';

@Pipe({
  name: 'phoneNumberFormatter'
})
export class FormattedStringToPhoneNumberPipe implements PipeTransform {

  transform(value: string): PhoneNumber | undefined {
    if(value.length == 0)
    {
      return undefined
    }
    let temp = value
    temp = temp.replaceAll(" ", "")
    temp = temp.replace("-", "")
    temp = temp.replace("(", "")
    temp = temp.replace(")", "")
    let result = new PhoneNumber()
    result.areaCode = temp.slice(0,3)
    result.localNumber = temp.slice(3,10)
    return result;
  }
}
