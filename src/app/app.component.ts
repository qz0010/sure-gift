import { Component } from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ApiService} from './modules/shared/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  public deviceType: string;

  constructor(
    private device: DeviceDetectorService,
    private api: ApiService
  ) {
    this.deviceType = this.device.isDesktop() ? 'desktop' : 'mobile';
  }
}
