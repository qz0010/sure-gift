import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../shared/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {IMultiLangField, IShowcaseFundraising} from '../../../../../types';
import {CartService} from '../../../../shared/services/cart.service';


export interface IRaisedTableItem {
  title: IMultiLangField;
  value?: number;
  type?: 'money' | 'number';
  code?: keyof IShowcaseFundraising;
  mark?: boolean;
}

@Component({
  selector: 'app-gifts-raised',
  templateUrl: './gifts-raised.component.html',
  styleUrls: ['./gifts-raised.component.styl']
})
export class GiftsRaisedComponent implements OnInit {
  public data: IShowcaseFundraising;
  public table: IRaisedTableItem[] = [
    {
      title: {ru: 'Собрано средств'},
      mark: true
    },
    {
      title: {ru: 'Подарено билетов'},
      mark: true
    },
    {
      title: {ru: 'Цель'},
    },
    {
      title: {ru: 'Всего билетов'},
    }
  ];
  public fundraisingPercent = 0;
  public fundraisingPartnerPercent = 0;
  public fundraisingPartnerPrice = 0;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public cart: CartService
  ) { }

  ngOnInit(): void {
    this.api.getShowCaseFundraising(this.route.snapshot.data?.showcase?._uuid).subscribe((data) => {
      const partnerValue = this.cart.calcFundraisingPartnerValue(data);

      this.data = data;
      this.fundraisingPercent = this.cart.calcFundraisingPercent(data) - partnerValue.percent;
      this.fundraisingPartnerPercent = partnerValue.percent;
      this.fundraisingPartnerPrice = partnerValue.price;

      this.makeTable();
    });
  }

  makeTable(): void {
    this.table = [
      {
        ...(this.table[0]),
        value: this.data.total_sum,
        code: 'total_sum',
        type: 'money'
      },
      {
        ...(this.table[1]),
        value: this.data.total_qty,
        code: 'total_qty',
        type: 'number'
      },
      {
        ...(this.table[2]),
        value: this.data.fundraising_plan,
        code: 'fundraising_plan',
        type: 'money'
      },
      {
        ...(this.table[3]),
        value: this.data.fundraising_slots,
        code: 'fundraising_slots',
        type: 'number'
      },
    ];
  }
}
