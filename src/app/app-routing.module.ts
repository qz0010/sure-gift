import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexModule} from './pages/index/index.module';
import {IndexComponent} from './pages/index/components/index/index.component';
import {ShowcaseResolver} from './modules/shared/services/showcase.resolver';
import {CheckoutModule} from './pages/checkout/checkout.module';
import {CheckoutPageComponent} from './pages/checkout/components/checkout-page/checkout-page.component';
import {ResultModule} from './pages/result/result.module';
import {ResultComponent} from './pages/result/components/result/result.component';
import {InitResolver} from './modules/shared/services/init.resolver';

const routes: Routes = [
  // {path: '', component: IndexComponent, resolve: {
  //     showcase: ShowcaseResolver,
  //     init: InitResolver
  //   }},
  {path: ':lang', component: IndexComponent, resolve: {
    // showcase: ShowcaseResolver,
    init: InitResolver
  }},
  {path: ':lang/checkout', component: CheckoutPageComponent, resolve: {
    // showcase: ShowcaseResolver,
    init: InitResolver
  }},
  {path: ':lang/result/:order_uuid/cert', component: ResultComponent, resolve: {init: InitResolver}},
  {path: '**', redirectTo: 'ru'}
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
