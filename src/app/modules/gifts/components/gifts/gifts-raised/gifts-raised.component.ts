import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../shared/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {IMultiLangField, IShowcaseFundraising} from '../../../../../types';
import {CartService} from '../../../../shared/services/cart.service';


export interface IRaisedTableItem {
  title: IMultiLangField;
  value?: number;
  type?: 'money' | 'number';
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
      title: {ru: 'Собрано билетов'},
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

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public cart: CartService
  ) { }

  ngOnInit(): void {
    this.api.getShowCaseFundraising(this.route.snapshot.data?.showcase?._uuid).subscribe((data) => {
      this.data = data;
      this.makeTable();
      this.fundraisingPercent = this.cart.calcFundraisingPercent(data);
    });
  }

  makeTable(): void {
    this.table = [
      {
        ...(this.table[0]),
        value: this.data.total_sum,
        type: 'money'
      },
      {
        ...(this.table[1]),
        value: this.data.total_qty,
        type: 'number'
      },
      {
        ...(this.table[2]),
        value: this.data.fundraising_plan,
        type: 'money'
      },
      {
        ...(this.table[3]),
        value: this.data.fundraising_slots,
        type: 'number'
      },
    ];
  }
}
