import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPopoverShowHide} from '../types/popover';

@Injectable()
export class PopoverService {
  private showHideSource: BehaviorSubject<IPopoverShowHide> = new BehaviorSubject<IPopoverShowHide>(null);
  public showHide$: Observable<IPopoverShowHide> = this.showHideSource.asObservable();

  constructor() { }

  open(data: IPopoverShowHide): void {
    this.showHideSource.next({show: true, ...data});
  }

  close(data?: IPopoverShowHide): void {
    this.showHideSource.next({show: false, ...data});
  }
}
