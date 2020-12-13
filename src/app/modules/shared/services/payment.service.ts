import { Injectable } from '@angular/core';
import { prop, path, isNil, isEmpty } from 'ramda';
import {ApiService} from './api.service';
import {ICertificateBody, ICertificateOrder, IPaymentMethod} from '../../../types';
import {Observable, of, throwError} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, map} from 'rxjs/operators';

export interface IContacts {
  phone?: string;
  email?: string;
  name?: string;
}

export interface IPayRes {
  contacts: IContacts;
  payment_method: string;
  payment_token: string;
  response: PaymentResponse;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private session: PaymentRequest;
  private readonly label = 'Sure';
  private readonly appleMethods = 'https://apple.com/apple-pay';
  private readonly googleMethods = 'https://google.com/pay';
  private paymentDetails: any = {
    total: {
      label: this.label,
    },
  };
  private googlePaymentsConfiguration = {
    environment: 'TEST',
    apiVersion: 2,
    apiVersionMinor: 0,
    merchantInfo: {
      // A merchant ID is available after approval by Google.
      merchantId: undefined,
      merchantName: undefined,
    },
    transactionInfo: {
      countryCode: 'RU',
      totalPriceStatus: 'FINAL',
      totalPrice: undefined,
      currencyCode: 'RU',
    },
  };
  private paymentMethodData;
  private paymentOptions;

  constructor(private api: ApiService) {}

  private setOptions(method: IPaymentMethod, total_cost: number, contacts: IContacts = {}): any {
    if (method) {
      const { paymentOptions, paymentDetails, paymentMethodData, googlePaymentsConfiguration } =
      this.getOptions(method, total_cost) || ({} as any);

      if (!contacts.phone) {
        paymentOptions['requestPayerPhone'] = true;
      }
      if (!contacts.email) {
        paymentOptions['requestPayerEmail'] = true;
      }
      this.paymentDetails = paymentDetails;
      this.paymentMethodData = paymentMethodData;
      this.paymentOptions = paymentOptions;
      this.googlePaymentsConfiguration = googlePaymentsConfiguration;
    }
  }

  public getOptions(method: IPaymentMethod, total_cost: number): any {
    if (method) {
      const paymentOptions = {};
      const currencyCode: string = path(['currency', 'alias'], method.ext_provider_data) || 'RUR';

      const paymentDetails = {
        total: {
          label: this.label,
          amount: {
            value: (total_cost * 0.01).toFixed(2),
            currency: currencyCode,
          },
        },
      };
      const settings: { [key: string]: any } = prop('params', method.ext_provider_data);
      let paymentMethodData = {
        data: Object.assign({currencyCode, total: paymentDetails.total}, prop('params', method.ext_provider_data)),
        supportedMethods: this.appleMethods,
      };
      let googlePaymentsConfiguration;
      if (method.type === 'gpay') {
        googlePaymentsConfiguration = {
          ...this.googlePaymentsConfiguration,
          ...settings.options,
          merchantInfo: {
            // A merchant ID is available after approval by Google.
            merchantId: settings.merchant.id || undefined,
            merchantName: settings.merchant.name,
          },
        };
        googlePaymentsConfiguration.transactionInfo.totalPrice = (total_cost * 0.01).toFixed(2);
        googlePaymentsConfiguration.transactionInfo.currencyCode = currencyCode;
        paymentMethodData = {
          supportedMethods: 'https://google.com/pay',
          data: googlePaymentsConfiguration,
        };
      }
      return { paymentOptions, paymentDetails, paymentMethodData, googlePaymentsConfiguration };
    } else {
      return null;
    }
  }

  public pay(
    method: IPaymentMethod,
    total_cost: number,
    contacts: IContacts = {}
  ): Observable<IPayRes> {
    if (method && method.type !== 'common') {
      this.setOptions(method, total_cost, contacts);
      try {
        this.session = new PaymentRequest(
          [this.paymentMethodData],
          this.paymentDetails,
          this.paymentOptions
        );
        if (method.type === 'applepay') {
          this.session['onmerchantvalidation'] = event => {
            const validationURL = event.validationURL;
            this.api.validateMerchant(method._uuid, { validationURL })
              .toPromise()
              .then(response => {
                event.complete(response);
              })
              .catch(e => {
                this.session.abort();
              });
          };
        }
        return fromPromise(this.session.show()).pipe(
          map(response => {
            if (response.payerPhone) {
              contacts.phone = response.payerPhone;
            }

            if (response.payerEmail) {
              contacts.email = response.payerEmail;
            }
            const token = path(['details', 'token', 'paymentData'], response) || JSON.parse(
              path(['details', 'paymentMethodData', 'tokenizationData', 'token'], response) || null
            );
            const _data = {
              contacts,
              payment_method: method._uuid,
              payment_token: token,
              response,
            };
            return _data;
          }),
          catchError(e => {
            console.error('REJECTED', e);
            return throwError(e);
          })
        ) as Observable<any>;
      } catch (e) {
        try {
          if (this.session) {
            this.session.abort();
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    return of(null);
  }

  public checkout(pm: IPaymentMethod, total_cost, order: ICertificateOrder, contacts: IContacts): Promise<any> {
    contacts = contacts || {};
    return new Promise<any>((resolve, reject) => {
      this.pay(pm, total_cost, {
        phone: contacts.phone,
        email: contacts.email,
      }).subscribe(
        data => {
          const orderData = { ...order.data, client: {email: contacts.email, phone: contacts.phone} };
          const cart_data: ICertificateBody = { ...orderData, payment_method: pm._uuid };
          const customPay = data && data.response ? data.response : null;
          if (customPay) {
            if (!isNil(data.response.payerPhone) && !isEmpty(data.response.payerPhone)) {
              cart_data.client.phone = data.response.payerPhone;
            }
            if (!isNil(data.response.payerEmail) && !isEmpty(data.response.payerEmail)) {
              cart_data.client.email = data.response.payerEmail;
            }
            cart_data.payment_token = data.payment_token;
          }
          this.api.newOrder(cart_data).subscribe(
            res => {
              const payment = res.payment;
              const redirectType: string = path(['payment_redirect', 'type'], payment);
              if (redirectType === 'acs') {
                const acsUrl = path(['payment_redirect', 'acsUrl'], payment);
                const acsMethod = path(['payment_redirect', 'acsMethod'], payment);
                const acsData = path(['payment_redirect', 'acsParam'], payment);
                const acsFields = Object.keys(acsData).reduce((acc, fieldName) => {
                  acc.push({
                    name: fieldName,
                    value: acsData[fieldName]
                  });
                  return acc;
                }, []);
                if (customPay) {
                  customPay.complete('success');
                }
                resolve();
                this.redirectWithPost(acsUrl, acsFields);
                return;
              }
              setTimeout(() => {
                resolve();
                window.location.href = res.payment.payment_url;
              }, 250);
            },
            () => {
              if (customPay) {
                customPay.complete('fail');
              }
              reject();
            }
          );
        },
        () => {
          reject();
        }
      );
    });
  }

  public redirectWithPost(url, fields?: {name: string; value: string}[]) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    if (fields) {
      fields.map(field => {
        form.innerHTML += `<input type="hidden" name="${field.name}" value="${field.value}" />`;
      });
    }
    document.body.appendChild(form);
    form.submit();
  }
}
