import { Injectable } from '@angular/core';
import {IShowcaseFundraising} from '../../../types';


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

  public set setterPrices(prices: number[]) {
    this.prices = prices;
  }
  public get getPrices(): number[] {
    return this.prices;
  }

  constructor() { }

  public calcFundraisingPercent(data: IShowcaseFundraising): number {
    return data.total_sum / data.fundraising_plan * 100 - this.partnershipInc.percent;
  }

  public countValuesByPrice(price: number): number {
    return price / this.oneValuePrice;
  }
}
