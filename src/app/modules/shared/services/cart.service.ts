import { Injectable } from '@angular/core';
import {ICertificateBody, ICertificateRes, IPaymentMethod, IShowcaseEvent, IShowcaseFundraising} from '../../../types';
import {Observable, Subject} from 'rxjs';
import {ApiService} from './api.service';
import {finalize} from 'rxjs/operators';
import {PaymentService} from './payment.service';


export interface IPartnershipInc {
  percent?: number;
}


@Injectable({
  providedIn: 'root'
})
export class CartService {
  public readonly prices_currency = {
    rur: '₽',
    rub: '₽',
    usd: '$',
    eur: '€',
    amd: '֏',
  };
  public readonly default_currency = 'rub';
  public partnershipInc: IPartnershipInc = {
    percent: 0
  };
  public oneValuePrice = 100000;
  public prices: number[];
  public currEvent: IShowcaseEvent;
  public total_cost = 0;
  public syncing = false;
  public panelSetRect$ = new Subject();

  public set setterPrices(prices: number[]) {
    this.prices = prices.sort((a, b) => b - a);
  }
  public get getPrices(): number[] {
    return this.prices;
  }

  public set setterEvent(event: IShowcaseEvent) {
    this.currEvent = event;
  }
  public get getEvent(): IShowcaseEvent {
    return this.currEvent;
  }

  constructor(
    private api: ApiService,
    private payment: PaymentService
  ) { }

  public calcFundraisingPercent(data: IShowcaseFundraising): number {
    return data.total_sum / data.fundraising_plan * 100 - this.partnershipInc.percent;
  }

  public countValuesByPrice(price: number): number {
    return price / this.oneValuePrice;
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

  public checkout(order: ICertificateBody, pm: IPaymentMethod): Promise<any> {
    this.syncing = true;

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
