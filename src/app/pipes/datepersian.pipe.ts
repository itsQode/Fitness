import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datepersian'
})
export class DatepersianPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    const myDate = value.toDate()
    return myDate.toLocaleDateString('fa-IR');
  }

}
