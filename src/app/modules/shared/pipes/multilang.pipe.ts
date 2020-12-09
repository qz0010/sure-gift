import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multilang'
})
export class MultilangPipe implements PipeTransform {

  constructor() {}

  transform(value: any): string {
    const lang = 'ru';
    if (value && typeof value === 'object') {
      const val = value[lang];
      // return propOr(k['ru'], lang, k);
      return val && typeof val === 'string' && val.length > 0 ? val : val['ru'];
    } else {
      return value;
    }
  }

}
