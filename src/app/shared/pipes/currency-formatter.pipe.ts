import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyFormatter',
    standalone: false
})
export class CurrencyFormatterPipe implements PipeTransform {

  transform(value: number, args:string = "USD") {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: args,
    });

    let result = formatter.format(value);
    return result;
}

}
