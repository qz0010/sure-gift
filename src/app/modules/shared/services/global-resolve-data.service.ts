import { Injectable } from '@angular/core';
import {ISettings, IShowcaseEvent, IShowcaseItem} from '../../../types';
import {ApiService} from './api.service';
import {shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalResolveDataService {
  public showcase: IShowcaseItem;
  public event: IShowcaseEvent;
  public settings$: Observable<ISettings> = this.api.getSettings().pipe(shareReplay(1));

  public set setterEvent(event: IShowcaseEvent) {
    this.event = event;
  }
  public set setterShowcase(showcase: IShowcaseItem) {
    this.showcase = showcase;
  }

  constructor(
    private api: ApiService
  ) {
  }
}
