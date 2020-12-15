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
    const result = price / 100;
    const lang = this.translate.currentLang || this.translate.defaultLang;
    const currency: IShowcaseCurrency = this.globalResolveData.showcase?.Currency;
    const currencyCode: string = currency?.code?.replace('RUR', 'RUB') || this.cart.default_currency;

    if (window?.Intl?.NumberFormat) {
      return new Intl.NumberFormat(`${lang}-${lang.toUpperCase()}`, {
        style: 'currency', currency: currencyCode, maximumSignificantDigits: 10
      })
        .format(result);
    }
    return `${result} ${currency?.sign}`;
  }

}
