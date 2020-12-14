import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import {ICertificateBody, ICertificateOrder, IPaymentMethod} from '../../../../types';
import {IContacts, PaymentService} from '../../services/payment.service';
import {PlatformService} from '../../services/platform.service';
import {CartService} from '../../services/cart.service';
import {IUser} from '../../../../types/User';

declare const google: any;

@Component({
  selector: 'app-gpay-button',
  templateUrl: './gpay-button.component.html',
  styleUrls: ['./gpay-button.component.styl']
})
export class GpayButtonComponent implements OnInit, AfterViewInit {
  // @Input('data') data: IPaymentMethod;
  // @Input() total_cost: number;
  // @Input() contacts: IContacts;
  // @Input() order: ICertificateOrder;
  // @Input() disabled = false;
  @Input() pm: IPaymentMethod;
  @Input() total_cost: number;
  @Input() disabled = false;
  @Input() client: IUser;
  @ViewChild('container', { static: false }) container: ElementRef;
  public supported = false;
  public acsUrl: string;
  public acsMethod: string;
  private session: PaymentRequest;
  private paymentMethodData;
  private paymentDetails;
  private paymentOptions;

  constructor(
    public payment: PaymentService,
    private renderer: Renderer2,
    private platform: PlatformService,
    private cart: CartService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.pm && this.platform.isBrowser) {
      try {
        const paymentOptions = this.payment.getOptions(this.pm, this.total_cost || 0);
        this.paymentMethodData = paymentOptions.paymentMethodData;
        this.paymentDetails = paymentOptions.paymentDetails;
        this.paymentOptions = paymentOptions.paymentOptions;
        const pr = new PaymentRequest([paymentOptions.paymentMethodData], paymentOptions.paymentDetails, paymentOptions.paymentOptions);
        pr.canMakePayment().then((s) => {
          // && google
          if (s === true) {
            this.supported = true;

            const paymentsClient = new google.payments.api.PaymentsClient({
              environment: paymentOptions.paymentMethodData.data.environment
            });
            const button = paymentsClient.createButton({
              onClick: () => this.buttonClick(),
              // buttonType: 'short',
              buttonColor: 'black'
            });
            this.renderer.appendChild(this.container.nativeElement, button);
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  public buttonClick() {
    this.cart.checkout(this.pm, this.client);
  }
}
