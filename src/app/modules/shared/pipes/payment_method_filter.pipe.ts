import { Pipe, PipeTransform } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import {IPaymentMethod, TPaymentMethodType} from '../../../types';
import { isEmpty, isNil } from 'ramda';


@Pipe({
  name: 'payment_method_filter',
  pure: false,
})
export class PaymentMethodFilterPipe implements PipeTransform {
  constructor(private device: DeviceDetectorService) {}
  transform(payment_methods: IPaymentMethod[], type?: TPaymentMethodType): IPaymentMethod[] {
    // console.log('PM PIPE', payment_methods, type);
    if (isNil(payment_methods) || isEmpty(payment_methods)) {
      return [];
    }
    const filtered: IPaymentMethod[] = [...payment_methods].filter(p => {
      if (p.type === 'applepay') {
        return this.canMakePayment();
        // && !this.device.isDesktop()
      }
      if (p.type === 'gpay' && this.device.browser.toLowerCase() === 'safari') {
        return null;
      }
      return p;
    });
    if (type) {
      if (type === '_custom') {
        return filtered.filter(p => p.type !== 'common');
      }
      return filtered.filter((el: IPaymentMethod) => el.type === type);
    } else {
      return filtered;
    }
  }

  canMakePayment(): boolean {
    let canMakePayment = false;
    try {
      canMakePayment =
        window['PaymentRequest'] &&
        window['ApplePaySession'] &&
        window['ApplePaySession'].canMakePayments &&
        window['ApplePaySession'].canMakePayments();
    } catch (err) {
      console.error(err);
      return false;
    }
    return canMakePayment;
  }
}
