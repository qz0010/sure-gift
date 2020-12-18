import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {GlobalResolveDataService} from './global-resolve-data.service';
import {TranslateService} from '@ngx-translate/core';
import {ApiService} from './api.service';
import {tap} from 'rxjs/operators';
import {CartService} from './cart.service';

@Injectable({providedIn: 'root'})
export class InitResolver implements Resolve<Observable<any>> {
  constructor(
    private globalResolveData: GlobalResolveDataService,
    private translate: TranslateService,
    private api: ApiService,
    private cart: CartService
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log(route);
    this.translate.setDefaultLang(route.params.lang === 'ru' ? 'ru' : 'en');
    this.translate.use(route.params.lang);
    this.globalResolveData.setterLang = route.params.lang;

    return combineLatest([
      this.api.getSettings().pipe(tap(s => this.globalResolveData.setterSettings = s)),
      this.api.getShowCaseList().pipe(tap(s => {
        this.cart.setterPrices = s[0].prices;
        this.cart.setterEvent = (s[0].meta?.fundraising?.events || [])[0];
        this.globalResolveData.setterShowcase = s[0];
      })),
    ]);
  }
}
