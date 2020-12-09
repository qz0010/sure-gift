import { Component, OnInit } from '@angular/core';
import {IShowcaseItem} from '../../../../types';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.styl']
})
export class GiftsComponent implements OnInit {
  public data: IShowcaseItem;

  constructor(
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.showcase;
  }

}
