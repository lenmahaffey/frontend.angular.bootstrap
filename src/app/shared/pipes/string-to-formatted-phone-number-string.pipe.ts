import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringToFormattedPhoneNumberString',
    standalone: false
})
export class StringToFormattedPhoneNumberStringPipe implements PipeTransform {

  transform(value: string): string {
    let result = "(   )    -    "
    let resultChars = [...result]

    let area = value.substring(0,3)
    let prefix = value.substring(3,6)
    let localNumber = value.substring(6)

    for(let i = 0; i < area.length; i++)
    {
      if(area[i] != undefined)
      {
        resultChars[i+1] = area[i]
      }
    }

    for(let i = 0; i < prefix.length; i++)
    {
      if(prefix[i] != undefined)
      {
        resultChars[i+6] = prefix[i]
      }
    }

    for(let i = 0; i < localNumber.length; i++)
    {
      if(localNumber[i] != undefined)
      {
        resultChars[i+10] = localNumber[i]
      }
    }
    return resultChars.join("");
  }
}
