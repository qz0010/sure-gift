import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApiService} from '../../../../modules/shared/services/api.service';
import {IShowcaseOrder, IShowcaseOrderItem, TOrderStatus} from '../../../../types';
import {PlatformService} from '../../../../modules/shared/services/platform.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.styl']
})
export class ResultComponent implements OnInit {
  private order_uuid: string;
  public data: IShowcaseOrder;
  public items: IShowcaseOrderItem[];
  public status: TOrderStatus;
  private timer = null;
  private timeout = null;
  private successStatuses: TOrderStatus[] = ['done', 'paid', 'on_delivery'];
  private errorStatuses: TOrderStatus[] = ['refund', 'cancel', 'outdated', 'error'];
  private finalStatuses: TOrderStatus[] = [...this.successStatuses, ...this.errorStatuses];
  public isSuccess: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private platform: PlatformService
  ) { }

  ngOnInit() {
    if (this.platform.isBrowser) {
      this.route.params.subscribe(data => {
        if (data && data.order_uuid) {
          this.order_uuid = data.order_uuid;
          this.checkOrder();

          this.timer = setInterval(() => {
            this.checkOrder();
          }, 2000);
          this.timeout = setTimeout(() => {
            clearInterval(this.timer);
          }, 1000 * 60 * 20);
        }
      });
    }
  }

  isValidStatus(): boolean {
    return this.finalStatuses.indexOf(this.status) >= 0;
  }

  isSuccessStatus(): boolean {
    return this.successStatuses.indexOf(this.status) >= 0;
  }

  isErrorStatus(): boolean {
    return this.errorStatuses.indexOf(this.status) >= 0;
  }

  checkStatus(): boolean {
    const isValidStatus = this.isValidStatus();
    if (isValidStatus) {
      const isSuccess = this.isSuccessStatus() && !!this.items?.length;

      if (!isSuccess) {
        return false;
      }
      this.isSuccess = isSuccess;
      clearInterval(this.timer);
      clearTimeout(this.timeout);
    }
    return isValidStatus;
  }

  checkOrder() {
    if (this.checkStatus()) return;

    this.api
      .showcaseOrder(this.order_uuid)
      .toPromise()
      .then(
        order => {
          this.status = order.status;
          this.data = order;
          this.items = order.items;
          // if (this.checkStatus() && this.isSuccessStatus() && order.items) {
            // const total_cost = order.items.reduce((acc, item) => {
            //   return acc += item.amount / 100;
            // }, 0);
            // this.metric.ecommmerceGtagPurchase({
            //   transaction_id: order.code,
            //   value: total_cost
            // }, {showcase: order.items});
            // this.metric.ecommmerceYandexPurchase({
            //   transaction_id: order.code,
            //   value: total_cost
            // }, {showcase: order.items});
            // this.metric.trackFb('Purchase', {value: total_cost});
          // }
        },
        err => {
          this.status = 'error';
          this.checkStatus();
        }
      );
  }
}
