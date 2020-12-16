import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SharedModule} from './modules/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PopoverModule} from './modules/popover/popover.module';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        AppRoutingModule,
        TranslateModule.forRoot({
            defaultLanguage: 'ru',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        SharedModule,
        BrowserAnimationsModule,
        PopoverModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
