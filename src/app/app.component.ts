import { Component } from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ApiService} from './modules/shared/services/api.service';
import {TranslateService} from '@ngx-translate/core';
import {CartService} from './modules/shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  public deviceType: string;

  constructor(
    private device: DeviceDetectorService,
    public cart: CartService
  ) {
    this.deviceType = this.device.isDesktop() ? 'desktop' : 'mobile';
  }
}
