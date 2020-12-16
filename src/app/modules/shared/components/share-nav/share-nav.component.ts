import { Component, OnInit } from '@angular/core';
import {SocialService} from '../../services/social.service';

@Component({
  selector: 'app-share-nav',
  templateUrl: './share-nav.component.html',
  styleUrls: ['./share-nav.component.styl']
})
export class ShareNavComponent implements OnInit {

  constructor(
    public social: SocialService
  ) { }

  ngOnInit(): void {
  }

}
