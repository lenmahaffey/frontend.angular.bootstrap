import { Pipe, PipeTransform } from '@angular/core';
import { PhoneNumber_DTO } from '../api/api.models';

@Pipe({
    name: 'stringToPhoneNumber',
    standalone: false
})
export class StringToPhoneNumberPipe implements PipeTransform {

  transform(value: string): PhoneNumber_DTO {
    let temp = value
    temp = temp.replaceAll(" ", "")
    temp = temp.replace("-", "")
    temp = temp.replace("(", "")
    temp = temp.replace(")", "")

    let result = new PhoneNumber_DTO()
    result.areaCode = temp.slice(0,3)
    result.prefix = temp.slice(3,6)
    result.localNumber = temp.slice(6)
    return result;
  }
}
