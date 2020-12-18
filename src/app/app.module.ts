import {BrowserModule, TransferState} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SharedModule} from './modules/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PopoverModule} from './modules/popover/popover.module';
import {translateBrowserLoaderFactory} from './loaders/translate-browser.loader';
import {TransferHttpCacheModule} from '@nguniversal/common';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        AppRoutingModule,
        TransferHttpCacheModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: translateBrowserLoaderFactory,
            deps: [HttpClient, TransferState]
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
