import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexModule} from './pages/index/index.module';
import {IndexComponent} from './pages/index/components/index/index.component';
import {ShowcaseResolver} from './modules/shared/services/showcase.resolver';
import {CheckoutModule} from './pages/checkout/checkout.module';
import {CheckoutPageComponent} from './pages/checkout/components/checkout-page/checkout-page.component';
import {ResultModule} from './pages/result/result.module';
import {ResultComponent} from './pages/result/components/result/result.component';

const routes: Routes = [
  {path: '', component: IndexComponent, resolve: {
    showcase: ShowcaseResolver,
  }},
  {path: 'checkout', component: CheckoutPageComponent, resolve: {
    showcase: ShowcaseResolver,
  }},
  {path: 'result/:order_uuid/cert', component: ResultComponent},
  {path: 'result/:order_uuid/cert/:lang', component: ResultComponent},
  {path: 'result/:order_uuid/cert', component: ResultComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled'
    }),
    IndexModule,
    CheckoutModule,
    ResultModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
