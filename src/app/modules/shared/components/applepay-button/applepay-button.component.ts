import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { isNil, isEmpty, path } from 'ramda';
import {ICertificateBody, ICertificateOrder, IPaymentMethod, IShowcaseCurrency} from '../../../../types';
import {PaymentService} from '../../services/payment.service';
import {ApiService} from '../../services/api.service';
import {LoggerService} from '../../services/logger.service';
import {CartService} from '../../services/cart.service';
import {IUser} from '../../../../types/User';
import {PlatformService} from '../../services/platform.service';
import {GlobalResolveDataService} from '../../services/global-resolve-data.service';
import {TranslateService} from '@ngx-translate/core';

declare const ApplePaySession: any;

@Component({
  selector: 'app-applepay-button',
  templateUrl: './applepay-button.component.html',
  styleUrls: ['./applepay-button.component.styl'],
})
export class ApplepayButtonComponent implements OnInit, AfterViewInit {
  @Input() pm: IPaymentMethod;
  @Input() md: ICertificateBody;
  @Input() total_cost: number;
  @Input() disabled = false;
  @Input() client: IUser;
  public fetching;

  private cart_data: ICertificateBody;

  constructor(
    private payment: PaymentService,
    private api: ApiService,
    private logger: LoggerService,
    private cart: CartService,
    private platform: PlatformService,
    private globalResolveData: GlobalResolveDataService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    const self = this;
    if (this.platform.isBrowser) {
      (window as any).startApplePaySession = function() {
        self.fetching = true;
        const cart_data: ICertificateBody = self.md || self.cart.createOrderBody(self.client);
        cart_data.payment_method = self.pm._uuid;
        cart_data.client = { ...cart_data.client };
        self.cart_data = { ...cart_data };
        self.logger.l(['cart_data onApplePayClick', self.cart_data], false);
        const paymentOptions = {
          requestPayerEmail: isNil(cart_data.client.email) || isEmpty(cart_data.client.email),
          requestPayerPhone: isNil(cart_data.client.phone) || isEmpty(cart_data.client.phone),
        };

        const requiredShippingContactFields = [];
        if (paymentOptions.requestPayerEmail) {
          requiredShippingContactFields.push('email');
        }
        if (paymentOptions.requestPayerPhone) {
          requiredShippingContactFields.push('phone');
        }

        const { paymentMethodData, paymentDetails } = self.payment.getOptions(self.pm, self.total_cost);

        const version = 3;
        const lang = self.translate.currentLang || self.translate.defaultLang;
        const currency: IShowcaseCurrency = self.globalResolveData.showcase?.Currency;
        const currencyCode: string = currency?.code?.replace('RUR', 'RUB');

        const request = {
          countryCode: lang.toUpperCase(),
          currencyCode,
          merchantCapabilities: paymentMethodData.data.merchantCapabilities,
          supportedNetworks: paymentMethodData.data.supportedNetworks,
          total: {
            label: path(['total', 'label'], paymentMethodData.data),
            type: 'final',
            amount: path(['total', 'amount', 'value'], paymentMethodData.data),
          },
          requiredShippingContactFields
        };

        self.logger.l(['session request', request], false);

        const session = new ApplePaySession(version, request);

        session.oncancel = function(event) {
          self.logger.l(['oncancel', event ], false);
          self.fetching = false;
        };
        session.onvalidatemerchant = function(event) {
          const validationURL = event.validationURL;
          self.logger.l([`[onmerchantvalidation] ${validationURL}`], false);

          self.api
            .validateMerchant(self.pm._uuid, { validationURL })
            .toPromise()
            .then(response => {
              self.logger.l(['validateMerchant complete', { response }], false);
              session.completeMerchantValidation(response);
            })
            .catch(e => {
              self.logger.l(['validateMerchant error', { error: e }], false);
              session.abort();
              self.fetching = false;
            });
        };
        session.onpaymentauthorized = function(response) {
          self.logger.l(['session.onpaymentauthorized', response], false);
          self.logger.l(['session.onpaymentauthorized session', session], false);
          const client = self.cart_data.client;
          client.phone = path(['payment', 'shippingContact', 'phoneNumber'], response) || client.phone;
          client.email = path(['payment', 'shippingContact', 'emailAddress'], response) || client.email;

          self.cart_data['payment_token'] = path(['payment', 'token', 'paymentData'], response);
          self.logger.l(['session cart_data', self.cart_data], false);

          self.api.newOrder(self.cart_data).subscribe(
            success => {
              session.completePayment(ApplePaySession.STATUS_SUCCESS);
              setTimeout(() => {
                self.logger.l(['success payment', success.payment], false);
                window.location.href = success.payment['payment_url'];
              }, 250);
            },
            error => {
              self.fetching = false;
              session.completePayment(ApplePaySession.STATUS_FAILURE);
            },
          );
        };
        session.begin();
        self.logger.l(['try session show'], false);
      };
    }
  }

  ngAfterViewInit(): void {

  }
}
