import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IShowcaseItem} from '../../../../types';
import {CartService} from '../../../../modules/shared/services/cart.service';
import {SocialService} from '../../../../modules/shared/services/social.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl']
})
export class IndexComponent implements OnInit {
  public data: IShowcaseItem;
  public showShare = false;

  constructor(
    private route: ActivatedRoute,
    public cart: CartService,
    public social: SocialService
  ) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.showcase;
  }

}
