import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number): string | number {
    if (window.Intl && window.Intl.NumberFormat) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'decimal', maximumSignificantDigits: 10
      })
        .format(value);
    }
    return value;
  }

}
