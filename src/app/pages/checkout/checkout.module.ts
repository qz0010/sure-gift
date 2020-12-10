import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import {SharedModule} from '../../modules/shared/shared.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [CheckoutPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class CheckoutModule { }
