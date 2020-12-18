import { Injectable } from '@angular/core';
import {ISettings, IShowcaseEvent, IShowcaseItem} from '../../../types';
import {ApiService} from './api.service';
import {shareReplay, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalResolveDataService {
  public lang: string;
  public showcase: IShowcaseItem;
  public settings: ISettings;
  public event: IShowcaseEvent;

  public set setterEvent(event: IShowcaseEvent) {
    this.event = event;
  }
  public set setterShowcase(showcase: IShowcaseItem) {
    this.showcase = showcase;
  }
  public set setterLang(lang: string) {
    this.lang = lang;
  }
  public set setterSettings(s: ISettings) {
    this.settings = s;
  }

  constructor(
    private api: ApiService
  ) {
  }
}
