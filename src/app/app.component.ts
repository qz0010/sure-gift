import {Component, ViewChild} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {TranslateService} from '@ngx-translate/core';
import {CartService} from './modules/shared/services/cart.service';
import {CartPanelComponent} from './modules/shared/components/cart-panel/cart-panel.component';
import {ActivatedRoute, NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  public deviceType: string;
  public showCart = false;
  public wrapPb = 0;

  @ViewChild(CartPanelComponent) cartPanel: CartPanelComponent;

  constructor(
    private device: DeviceDetectorService,
    private route: ActivatedRoute,
    private router: Router,
    public cart: CartService,
    private translate: TranslateService,
  ) {
    this.deviceType = this.device.isDesktop() ? 'desktop' : 'mobile';

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const pathname = window?.location?.pathname;
        this.showCart = pathname === '/' || pathname === `/${translate.currentLang}`;
        this.wrapPb = this.showCart ? this.wrapPb : null;
      }
    });

    this.cart.panelSetRect$.subscribe(() => {
      this.wrapPb = this.cartPanel.rect.height * 1.2;
    });
  }
}
