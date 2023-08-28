import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toShortDateString'
})
export class ToShortDateStringPipe extends DatePipe implements PipeTransform {

  transfrom(value: any): any {
    return super.transform(value, "MMM/dd/yyyy")
  }

}
