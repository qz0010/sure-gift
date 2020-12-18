import { Component, OnInit } from '@angular/core';
import {IShowcaseItem} from '../../../../types';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../../shared/services/cart.service';
import {GlobalResolveDataService} from '../../../shared/services/global-resolve-data.service';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.styl']
})
export class GiftsComponent implements OnInit {
  public data: IShowcaseItem;

  constructor(
    private route: ActivatedRoute,
    public cart: CartService,
    public globalResolveDataService: GlobalResolveDataService
  ) { }

  ngOnInit(): void {
    this.data = this.globalResolveDataService.showcase;
  }

}
