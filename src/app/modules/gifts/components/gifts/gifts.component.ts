import { Component, OnInit } from '@angular/core';
import {IShowcaseItem} from '../../../../types';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../../shared/services/cart.service';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.styl']
})
export class GiftsComponent implements OnInit {
  public data: IShowcaseItem;

  constructor(
    private route: ActivatedRoute,
    public cart: CartService
    ) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.showcase;
  }

}
