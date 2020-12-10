import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {IShowcaseItem} from '../../../../types';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.styl']
})
export class CartPanelComponent implements OnInit {
  public data: IShowcaseItem;

  constructor(
    public cart: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.showcase;
  }

}
