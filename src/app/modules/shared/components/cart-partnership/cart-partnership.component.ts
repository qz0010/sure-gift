import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-cart-partnership',
  templateUrl: './cart-partnership.component.html',
  styleUrls: ['./cart-partnership.component.styl']
})
export class CartPartnershipComponent implements OnInit {
  public showInfo = false;
  public isDesktop: boolean;

  constructor(
    public cart: CartService,
    private device: DeviceDetectorService
  ) {
    this.isDesktop = device.isDesktop();
  }

  ngOnInit(): void {
  }

}
