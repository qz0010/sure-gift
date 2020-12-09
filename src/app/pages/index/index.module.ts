import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import {MainLayoutModule} from '../../modules/layouts/main-layout/main-layout.module';
import {GiftsModule} from '../../modules/gifts/gifts.module';
import {EventsModule} from '../../modules/events/events.module';
import {SharedModule} from '../../modules/shared/shared.module';



@NgModule({
  declarations: [IndexComponent],
    imports: [
        CommonModule,
        MainLayoutModule,
        GiftsModule,
        EventsModule,
        SharedModule
    ]
})
export class IndexModule { }
