import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IShowcaseEvent, IShowcaseItem} from '../../../../types';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.styl']
})
export class EventsComponent implements OnInit {
  public showcase: IShowcaseItem;
  public event: IShowcaseEvent;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const showcase = this.route.snapshot.data.showcase;
    const events: IShowcaseEvent[] = showcase?.meta?.fundraising?.events || [];

    this.showcase = showcase;
    this.event = events[0];
  }
}
