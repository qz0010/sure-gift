import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IShowcaseEvent, IShowcaseItem} from '../../../../types';
import {GlobalResolveDataService} from '../../../shared/services/global-resolve-data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.styl']
})
export class EventsComponent implements OnInit {
  public showcase: IShowcaseItem;
  public event: IShowcaseEvent;

  constructor(
    private route: ActivatedRoute,
    public globalResolveDataService: GlobalResolveDataService
  ) { }

  ngOnInit(): void {
    const showcase = this.globalResolveDataService.showcase;
    const events: IShowcaseEvent[] = showcase?.meta?.fundraising?.events || [];

    this.showcase = showcase;
    this.event = events[0];
  }
}
