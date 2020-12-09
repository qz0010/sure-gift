import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftsComponent } from './components/gifts/gifts.component';
import { GiftsListComponent } from './components/gifts/gifts-list/gifts-list.component';
import { GiftsRaisedComponent } from './components/gifts/gifts-raised/gifts-raised.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [GiftsComponent, GiftsListComponent, GiftsRaisedComponent],
  exports: [GiftsComponent, GiftsListComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class GiftsModule { }
