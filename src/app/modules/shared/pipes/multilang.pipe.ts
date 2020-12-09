import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'multilang'
})
export class MultilangPipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) {}

  transform(value: any): string {
    if (value && typeof value === 'object') {
      const lang = this.translate.currentLang;
      const val = value[lang];
      return val && typeof val === 'string' && val.length > 0 ? val : value[this.translate.defaultLang];
    } else {
      return value;
    }
  }

}
