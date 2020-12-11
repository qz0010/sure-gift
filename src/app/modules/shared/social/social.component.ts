import {Component, Input, OnInit} from '@angular/core';
import {ISocialItem, SocialService} from '../services/social.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.styl']
})
export class SocialComponent implements OnInit {
  @Input() type: 'share' | 'link' = 'link';
  @Input('items')  set setItems(items: ISocialItem[]) {
    if (items?.length) {
      this.currItems = items.map(item => {
        const initialItem = this.social.data.find(dataItem => dataItem.short_name === item.short_name);
        return {
          ...(initialItem || {}),
          ...item
        };
      });
    }
  };
  public currItems: ISocialItem[];

  constructor(
    public social: SocialService
  ) { }

  ngOnInit(): void {
  }

}
