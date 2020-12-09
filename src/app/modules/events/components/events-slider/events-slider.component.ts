import {Component, Input, OnInit} from '@angular/core';
import {IShowcaseEvent} from '../../../../types';

@Component({
  selector: 'app-events-slider',
  templateUrl: './events-slider.component.html',
  styleUrls: ['./events-slider.component.styl']
})
export class EventsSliderComponent implements OnInit {
  @Input() event: IShowcaseEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
