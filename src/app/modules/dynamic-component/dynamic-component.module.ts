import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DynamicComponentService} from './services/dynamic-component.service';



@NgModule({
  declarations: [],
  providers: [
    DynamicComponentService
  ],
  imports: [
    CommonModule
  ]
})
export class DynamicComponentModule { }
