import {Component, Input, OnInit} from '@angular/core';
import {ISocialItem, SocialService} from '../services/social.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.styl']
})
export class SocialComponent implements OnInit {
  @Input() type: 'share' | 'link' = 'link';
  @Input() items: ISocialItem[];

  constructor(
    public social: SocialService
  ) { }

  ngOnInit(): void {
  }

}
