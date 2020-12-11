import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResultComponent} from './components/result/result.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../../modules/shared/shared.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    ResultComponent
  ],
  exports: [
    ResultComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    RouterModule
  ]
})
export class ResultModule { }
