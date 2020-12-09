import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabsComponent} from './components/tabs/tabs.component';
import {TabsTabComponent} from './components/tabs/tabs-tab/tabs-tab.component';
import {TabsTabContentTemplateDirective, TabsTabIconTemplateDirective} from './directives/tabs-templates.directive';
import {ScrollModule} from '../scroll/scroll.module';



@NgModule({
  declarations: [
    TabsComponent,
    TabsTabComponent,
    TabsTabContentTemplateDirective,
    TabsTabIconTemplateDirective
  ],
  exports: [
    TabsComponent,
    TabsTabComponent,
    TabsTabContentTemplateDirective,
    TabsTabIconTemplateDirective
  ],
  imports: [
    CommonModule,
    ScrollModule
  ]
})
export class TabsModule { }
