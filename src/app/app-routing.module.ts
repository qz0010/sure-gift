import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexModule} from './pages/index/index.module';
import {IndexComponent} from './pages/index/components/index/index.component';
import {ShowcaseResolver} from './modules/shared/services/showcase.resolver';

const routes: Routes = [
  {path: '', component: IndexComponent, resolve: {
    showcase: ShowcaseResolver,
  }},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    }),
    IndexModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
