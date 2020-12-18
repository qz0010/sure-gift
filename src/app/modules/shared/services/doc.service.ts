import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalService } from './global.service';
import {GlobalResolveDataService} from './global-resolve-data.service';
import {IMultiLangField, ISettings} from '../../../types';
import {ApiService} from './api.service';

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
    private globalResolveData: GlobalResolveDataService,
    private api: ApiService
  ) {
    // globalResolveData.settings$.subscribe(s => {
    //   if (s.offer) {
    //     this.init(s);
    //   } else {
    //     globalResolveData.offer$.subscribe(value => {
    //       this.docs.gift_offer = value;
    //       this.docs.offer = value;
    //     });
    //   }
    // });
  }

  init(s: ISettings): void {
    this.docs.gift_offer = s.gift_offer;
    this.docs.offer = s.offer;
  }

  public openPopup(name: keyof IDocs): void {
    this.api.getOffer().subscribe(offer => {
      this.data.src = offer;
      this.global.toggleBodyOverflow(true);
      this.showHidePopupSource.next(true);
    });
    // this.data.src = this.docs[name];
  }

  public closePopup(): void {
    this.global.toggleBodyOverflow(false);
    this.showHidePopupSource.next(false);
  }
}
