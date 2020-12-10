import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultilangPipe} from './pipes/multilang.pipe';
import {MoneyPipe} from './pipes/money.pipe';
import {CartService} from './services/cart.service';
import {CartComponent} from './components/cart/cart.component';
import {CartPanelComponent} from './components/cart-panel/cart-panel.component';
import {ScrollComponent} from '../scroll/components/scroll/scroll.component';
import {TabsComponent} from '../tabs/components/tabs/tabs.component';
import {TabsTabComponent} from '../tabs/components/tabs/tabs-tab/tabs-tab.component';
import {SponsorsComponent} from './sponsors/sponsors.component';
import {TabsModule} from '../tabs/tabs.module';
import {SocialComponent} from './social/social.component';
import {SocialService} from './services/social.service';
import {HowComponent} from './how/how.component';
import {ApiService} from './services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {CountValuesByPricePipe} from './pipes/count-values-by-price.pipe';
import {NumerativePipe} from './pipes/numerative.pipe';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {PlusMinusComponent} from '../plus-minus/components/plus-minus/plus-minus.component';
// import {ExtendFormErrorsComponent} from './extend-components/form-errors/form-errors.component';
import {CartPersonalComponent} from './components/cart/cart-personal/cart-personal.component';
import {FormsModule} from '@angular/forms';
import {NativeElementControlDirective} from './directives/native-element-control.directive';


@NgModule({
  declarations: [
    MultilangPipe,
    MoneyPipe,
    CartComponent,
    CartPanelComponent,
    SponsorsComponent,
    SocialComponent,
    HowComponent,
    CountValuesByPricePipe,
    NumerativePipe,
    PlusMinusComponent,
    // ExtendFormErrorsComponent,
    CartPersonalComponent,
    NativeElementControlDirective
  ],
  exports: [
    MultilangPipe,
    MoneyPipe,
    CartComponent,
    CartPanelComponent,
    SponsorsComponent,
    SocialComponent,
    HowComponent,
    CountValuesByPricePipe,
    NumerativePipe,
    TranslateModule,
    PlusMinusComponent,
    // ExtendFormErrorsComponent,
    CartPersonalComponent,
    NativeElementControlDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TabsModule,
    RouterModule,
    FormsModule,
    TranslateModule
  ],
  providers: []
})
export class SharedModule {
}
