import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [MainLayoutComponent, HeaderComponent, FooterComponent],
  exports: [MainLayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MainLayoutModule { }
