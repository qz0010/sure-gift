import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../../shared/services/cart.service';

@Component({
  selector: 'app-gifts-list',
  templateUrl: './gifts-list.component.html',
  styleUrls: ['./gifts-list.component.styl']
})
export class GiftsListComponent implements OnInit {

  constructor(
    public cart: CartService
  ) { }

  ngOnInit(): void {
  }

}
