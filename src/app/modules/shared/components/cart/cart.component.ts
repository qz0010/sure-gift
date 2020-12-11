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
  public commonPaymentMethod: IPaymentMethod;
  public showcase: IShowcaseItem;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public cart: CartService
  ) { }

  ngOnInit(): void {
    this.showcase = this.route.snapshot.data.showcase;

    this.api.getPaymentMethods().subscribe(data => {
      this.commonPaymentMethod = data.find(item => item.type === 'common');
    });
  }

  checkout() {

  }

  onSubmit(client: IUser): void {
    if (!this.commonPaymentMethod || !this.showcase) {
      return;
    }
    const order: ICertificateBody = {
      payment_method: this.commonPaymentMethod.uuid || this.commonPaymentMethod._uuid,
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
          sender_name: `${client.firstName} ${client.lastName}`
        }
      ]
    };

    this.cart.checkout(order).subscribe(data => {
      if (data?.payment?.payment_url) {
        location.href = data.payment.payment_url;
      }
    });
  }
}

