import { Injectable } from '@angular/core';
import {ICertificateBody, ICertificateRes, IPaymentMethod, IShowcaseEvent, IShowcaseFundraising} from '../../../types';
import {Observable, Subject} from 'rxjs';
import {ApiService} from './api.service';
import {finalize} from 'rxjs/operators';
import {PaymentService} from './payment.service';
import {IUser} from '../../../types/User';
import {GlobalResolveDataService} from './global-resolve-data.service';
import {TranslateService} from '@ngx-translate/core';


export interface IPartnershipInc {
  percent?: number;
}


@Injectable({
  providedIn: 'root'
})
export class CartService {
  public readonly default_currency = 'RUB';
  public partnershipInc: IPartnershipInc = {
    percent: 30
  };
  public oneValuePrice = 100000;
  public prices: number[];
  public pricesRange: number[] = [];
  public currEvent: IShowcaseEvent;
  public total_cost = 0;
  public fundraisingPartnerValue;
  public syncing = false;
  public panelSetRect$ = new Subject();

  public set setterPrices(prices: number[]) {
    this.prices = prices.sort((a, b) => b - a);
    this.pricesRange[0] = Math.min(...prices);
  }
  public get getPrices(): number[] {
    return this.prices;
  }

  public set setterFundraisingPartnerValue(value) {
    this.fundraisingPartnerValue = value;
  }

  public set setterEvent(event: IShowcaseEvent) {
    this.currEvent = event;
  }
  public get getEvent(): IShowcaseEvent {
    return this.currEvent;
  }

  constructor(
    private api: ApiService,
    private payment: PaymentService,
    private globalResolveData: GlobalResolveDataService,
    private translate: TranslateService
  ) { }

  public calcFundraisingPartnerValue(data: IShowcaseFundraising): {price: number, percent: number} {
    const {total_sum, fundraising_plan} = data;
    const price = Math.round(total_sum / 100 * this.partnershipInc.percent - 0.01);
    const value = {price, percent: price / fundraising_plan * 100};

    this.setterFundraisingPartnerValue = value;
    return value;
  }

  public calcFundraisingPercent(data: IShowcaseFundraising): number {
    return data.total_sum / data.fundraising_plan * 100;
  }

  public countValuesByPrice(price: number, partner = false): number {
    const value = Math.round(price / this.oneValuePrice - 0.01);

    if (partner) {
      if (!this.partnershipInc?.percent) {
        return null;
      }
      return Math.round(value / 100 * this.partnershipInc.percent - 0.01);
    }
    return value;
  }

  public selectPrice(price: number): void {
    if (this.total_cost === price) {
      this.total_cost = 0;
    } else {
      this.total_cost = price;
    }
  }

  public changePriceCalc(dir: number): void {
    const price = this.total_cost + dir;
    this.total_cost = price >= 0 ? price : 0;
  }

  public createOrderBody(client: IUser): ICertificateBody {
    const  {showcase} = this.globalResolveData;

    return {
      lang: this.translate.currentLang || this.translate.defaultLang,
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
          cert_config: showcase.uuid || showcase._uuid,
          cert_view: (showcase.views || [])[0],
          count: 1,
          is_corporate: false,
          is_gift: true,
          price: this.total_cost,
          sender_name: `${client.firstName}`
        }
      ]
    };
  }

  public checkout(pm: IPaymentMethod, client: IUser): Promise<any> {
    this.syncing = true;
    const order = this.createOrderBody(client);

    return this.payment.checkout(pm, this.total_cost, {
      type: 'gift',
      data: order
    }, order.client)
      .finally(
        () => {
          setTimeout(() => {
            this.syncing = false;
          }, 1000);
        }
      );
  }
}
