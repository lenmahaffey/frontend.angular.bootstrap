import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'monthNameFromDate',
    standalone: false
})
export class MonthNameFromDatePipe implements PipeTransform {

  transform(value: Date) {
    value.setMonth(value.getMonth())
    return value.toLocaleString('default', { month: 'long' });
}

}
