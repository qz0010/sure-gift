import { Pipe, PipeTransform } from '@angular/core';
import {CartService} from '../services/cart.service';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  constructor(
    private cart: CartService,
    private translate: TranslateService
  ) {
  }

  transform(value: number): string | number {
    const lang = this.translate.currentLang || this.translate.defaultLang;

    if (window.Intl && window.Intl.NumberFormat) {
      return new Intl.NumberFormat(`${lang}-${lang.toUpperCase()}`, {
        style: 'decimal', maximumSignificantDigits: 10
      })
        .format(value);
    }
    return value;
  }

}
