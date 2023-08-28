import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toShortTimeString'
})
export class ToShortTimeStringPipe implements PipeTransform {

  transform(value: Date) {
    let result = value.toLocaleTimeString().split('').reverse().join('')
    let temp = result.substring(0,3)
    temp += result.substring(6, result.length)
    result = temp.split('').reverse().join('')
    return result
  }

}
