import { Pipe, PipeTransform } from '@angular/core';
import {CartService} from '../services/cart.service';
import {TranslateService} from '@ngx-translate/core';
import {GlobalResolveDataService} from '../services/global-resolve-data.service';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  constructor(
    private cart: CartService,
    private translate: TranslateService,
    private globalResolveData: GlobalResolveDataService,
  ) {
  }

  transform(value: number): string | number {
    const lang = this.translate.currentLang || this.translate.defaultLang;

    if (window?.Intl && window?.Intl?.NumberFormat) {
      const options: any = {
        style: 'decimal'
      };
      if (lang === 'ru') {
        options.maximumSignificantDigits = 10;
      }
      return new Intl.NumberFormat(`${this.globalResolveData.settings?.widget_settings?.locale}`, options)
        .format(value);
    }
    return value;
  }

}
