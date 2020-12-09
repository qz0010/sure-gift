import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numerative',
})
export class NumerativePipe implements PipeTransform {
  transform(value: number, titles: any, type?: string, args?: any): string {
    if (value <= 0 || !titles.length) {
      return '';
    }

    if (type === 'with') return titles[value > 1 ? 1 : 0];

    const cases = [2, 0, 1, 1, 1, 2];

    return titles[value % 100 > 4 && value % 100 < 20 ? 2 : cases[value % 10 < 5 ? value % 10 : 5]];
  }
}
