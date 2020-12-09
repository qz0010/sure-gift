import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IShowcaseItem} from '../../../../types';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl']
})
export class IndexComponent implements OnInit {
  public data: IShowcaseItem;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.showcase;
  }

}
