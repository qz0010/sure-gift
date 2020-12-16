import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './components/popover/popover.component';
import {PopoverService} from './services/popover.service';
import {DynamicComponentModule} from '../dynamic-component/dynamic-component.module';



@NgModule({
  declarations: [PopoverComponent],
  exports: [
    PopoverComponent
  ],
  providers: [
    PopoverService
  ],
  imports: [
    CommonModule,
    DynamicComponentModule
  ]
})
export class PopoverModule { }
