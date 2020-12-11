import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IShowcaseItem} from '../../../../types';
import {CartService} from '../../../../modules/shared/services/cart.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl']
})
export class IndexComponent implements OnInit {
  public data: IShowcaseItem;

  constructor(
    private route: ActivatedRoute,
    public cart: CartService
  ) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.showcase;
  }

}
