import { Pipe, PipeTransform } from '@angular/core';
import { PhoneNumber_DTO } from '../api/api.models';

@Pipe({
  name: 'stringToPhoneNumber'
})
export class FormattedStringToPhoneNumberPipe implements PipeTransform {

  transform(value: string): PhoneNumber_DTO | undefined {
    if(value.length == 0)
    {
      return undefined
    }
    let temp = value
    temp = temp.replaceAll(" ", "")
    temp = temp.replace("-", "")
    temp = temp.replace("(", "")
    temp = temp.replace(")", "")
    let result = new PhoneNumber_DTO()
    result.areaCode = temp.slice(0,3)
    result.localNumber = temp.slice(3,10)
    return result;
  }
}
