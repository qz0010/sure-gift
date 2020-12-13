import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalService } from './global.service';
import {GlobalResolveDataService} from './global-resolve-data.service';
import {IMultiLangField, ISettings} from '../../../types';

export interface IDocs {
  gift_offer?: IMultiLangField;
  offer?: IMultiLangField;
}

export interface IDocData {
  src?: IMultiLangField;
}

@Injectable({
  providedIn: 'root'
})
export class DocService {
  private showHidePopupSource = new Subject<boolean>();
  public showHidePopup = this.showHidePopupSource.asObservable();
  public data: IDocData = {};
  public docs: IDocs = {};

  constructor(
    private global: GlobalService,
    private globalResolveData: GlobalResolveDataService
  ) {
    globalResolveData.settings$.subscribe(s => {
      this.init(s);
    });
  }

  init(s: ISettings) {
    this.docs.gift_offer = s.gift_offer;
    this.docs.offer = s.offer;
  }

  public openPopup(name: keyof IDocs) {
    this.data.src = this.docs[name];
    this.global.toggleBodyOverflow(true);
    this.showHidePopupSource.next(true);
  }

  public closePopup() {
    this.global.toggleBodyOverflow(false);
    this.showHidePopupSource.next(false);
  }
}
