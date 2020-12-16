import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IShowcaseItem} from '../../../../types';
import {CartService} from '../../../../modules/shared/services/cart.service';
import {SocialService} from '../../../../modules/shared/services/social.service';
import {PopoverService} from '../../../../modules/popover/services/popover.service';
import {GiftsRaisedComponent} from '../../../../modules/gifts/components/gifts/gifts-raised/gifts-raised.component';
import {ShareNavComponent} from '../../../../modules/shared/components/share-nav/share-nav.component';

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
    public social: SocialService,
    public popoverService: PopoverService
  ) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.showcase;
  }

  public onShareClick(e: Event): void {
    this.showShare = true;
    this.popoverService.open({component: ShareNavComponent, target: e.currentTarget as HTMLElement});
  }

  public closeShare(): void {
    this.showShare = false;
    this.popoverService.close({component: ShareNavComponent});
  }
}
