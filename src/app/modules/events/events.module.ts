import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './components/events/events.component';
import {SharedModule} from '../shared/shared.module';
import {TabsModule} from '../tabs/tabs.module';
import { EventsSliderComponent } from './components/events-slider/events-slider.component';
import {ScrollModule} from '../scroll/scroll.module';



@NgModule({
  declarations: [EventsComponent, EventsSliderComponent],
  exports: [EventsComponent, EventsSliderComponent],
  imports: [
    CommonModule,
    SharedModule,
    TabsModule,
    ScrollModule
  ]
})
export class EventsModule { }
