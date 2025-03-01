import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcToLocal',
  standalone: false
})
export class UtcToLocalPipe implements PipeTransform {

  transform(value:Date): Date {
    console.log(value)
    return new Date(value)
  }

}
