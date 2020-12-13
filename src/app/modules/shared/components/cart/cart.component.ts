import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ICertificateBody, IPaymentMethod, IShowcaseItem} from '../../../../types';
import {IUser} from '../../../../types/User';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.styl']
})
export class CartComponent implements OnInit {
  public paymentMethods: IPaymentMethod[];
  public commonPaymentMethod: IPaymentMethod;
  public showcase: IShowcaseItem;
  public selectedPaymentMethod: IPaymentMethod;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public cart: CartService,
  ) { }

  ngOnInit(): void {
    this.showcase = this.route.snapshot.data.showcase;

    this.api.getPaymentMethods().subscribe(data => {
      this.paymentMethods = data;
      this.commonPaymentMethod = data.find(item => item.type === 'common');
      this.selectedPaymentMethod = this.commonPaymentMethod;
    });
  }

  checkout() {

  }

  onSelectPaymentMethod(pm: IPaymentMethod): void {
    this.selectedPaymentMethod = pm;
  }

  onSubmit(client: IUser): void {
    if (!this.selectedPaymentMethod || !this.showcase) {
      return;
    }
    const order: ICertificateBody = {
      lang: 'ru',
      client: {
        email: client.email,
        name: client.firstName,
        phone: client.phoneNumber
      },
      items: [
        {
          addressee: {
            email: client.email,
            name: client.firstName,
            phone: client.phoneNumber
          },
          cert_config: this.showcase.uuid || this.showcase._uuid,
          cert_view: (this.showcase.views || [])[0],
          count: 1,
          is_corporate: false,
          is_gift: true,
          price: this.cart.total_cost,
          sender_name: `${client.firstName}`
        }
      ]
    };

    this.cart.checkout(order, this.selectedPaymentMethod).finally();
  }
}

