import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-partnership',
  templateUrl: './cart-partnership.component.html',
  styleUrls: ['./cart-partnership.component.styl']
})
export class CartPartnershipComponent implements OnInit {
  public showInfo = false;

  constructor(
    public cart: CartService
  ) { }

  ngOnInit(): void {
  }

}
