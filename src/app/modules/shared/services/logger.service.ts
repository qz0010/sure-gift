import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  debug: boolean = !environment.production;
  private isBrowser: boolean;
  private log$ = new Subject<{
    values: any[];
    ev: string;
    debugOnly: boolean;
    browserOnly: boolean;
  }>();

  constructor(@Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.log$.subscribe((opt) => {
      if (
        (opt.debugOnly ? this.debug : true) &&
        (opt.browserOnly ? this.isBrowser : true)
      ) {
        console[opt.ev].apply(this, opt.values);
      }
    });
  }

  l(values: any[], debugOnly = true, browserOnly = true) {
    this.log$.next({values, ev: 'log', debugOnly, browserOnly});
  }

  e(values: any[], debugOnly = true, browserOnly = true) {
    this.log$.next({values, ev: 'error', debugOnly, browserOnly});
  }

  w(values: any[], debugOnly = true, browserOnly = true) {
    this.log$.next({values, ev: 'warn', debugOnly, browserOnly});
  }

  i(values: any[], debugOnly = true, browserOnly = true) {
    this.log$.next({values, ev: 'info', debugOnly, browserOnly});
  }
}
