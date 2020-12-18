import { Pipe, PipeTransform } from '@angular/core';
import {IShowcaseCurrency, TCurrency} from '../../../types';
import {CartService} from '../services/cart.service';
import {GlobalResolveDataService} from '../services/global-resolve-data.service';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {
  constructor(
    private cart: CartService,
    private globalResolveData: GlobalResolveDataService,
    private translate: TranslateService
  ) {
  }

  transform(price: number): string {
    const result = Math.round(price / 100);
    const lang = this.translate.currentLang || this.translate.defaultLang;
    const currency: IShowcaseCurrency = this.globalResolveData.showcase?.Currency;
    const currencyCode: string = currency?.code?.replace('RUR', 'RUB') || this.cart.default_currency;

    if (window?.Intl?.NumberFormat && this.globalResolveData.settings?.widget_settings?.locale) {
      const options: any = {
        style: 'currency', currency: currencyCode
      };
      if (lang === 'ru') {
        options.maximumSignificantDigits = 10;
      }
      //${this.globalResolveData.settings?.widget_settings?.locale}
      return new Intl.NumberFormat(`${this.globalResolveData.settings?.widget_settings?.locale}`, options)
        .format(result);
    }
    return `${result} ${currency?.sign}`;
  }

}
