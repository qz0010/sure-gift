import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollComponent} from './components/scroll/scroll.component';



@NgModule({
  declarations: [ScrollComponent],
  exports: [ScrollComponent],
  imports: [
    CommonModule
  ]
})
export class ScrollModule { }
