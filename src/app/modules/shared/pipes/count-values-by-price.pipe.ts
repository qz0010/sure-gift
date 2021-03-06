import { Pipe, PipeTransform } from '@angular/core';
import {CartService} from '../services/cart.service';

@Pipe({
  name: 'countValuesByPrice'
})
export class CountValuesByPricePipe implements PipeTransform {

  constructor(
    private cart: CartService
  ) {
  }

  transform(price: number, opt: {partner?: boolean} = {}): number {
    return this.cart.countValuesByPrice(price, opt.partner);
  }
}
