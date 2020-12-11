import { Pipe, PipeTransform } from '@angular/core';
import {TCurrency} from '../../../types';
import {CartService} from '../services/cart.service';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {
  constructor(
    private cart: CartService
  ) {
  }

  transform(price: number, currency?: TCurrency): string {
    const currencies = this.cart.prices_currency;
    const result = price / 100;
    if (window.Intl && window.Intl.NumberFormat) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency', currency: 'RUB', maximumSignificantDigits: 10
      })
        .format(result);
    }
    return `${result} ${currencies[currency] || currencies[this.cart.default_currency]}`;
  }

}
