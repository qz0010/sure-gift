import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlusMinusComponent} from './components/plus-minus/plus-minus.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    // PlusMinusComponent
  ],
  exports: [
    // PlusMinusComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PlusMinusModule { }
