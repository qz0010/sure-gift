import { Injectable } from '@angular/core';
import {IShowcaseEvent, IShowcaseItem} from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class GlobalResolveDataService {
  public showcase: IShowcaseItem;
  public event: IShowcaseEvent;

  public set setterEvent(event: IShowcaseEvent) {
    this.event = event;
  }
  public set setterShowcase(showcase: IShowcaseItem) {
    this.showcase = showcase;
  }

  constructor() { }
}
