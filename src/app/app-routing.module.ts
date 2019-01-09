import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from '../app/home/home.module';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
const routes: Routes = [
  { path: '', redirectTo: 'index/duty', pathMatch: 'full' }
];

@NgModule({
  imports: [HomeModule, RouterModule.forRoot(routes, {preloadingStrategy: SelectivePreloadingStrategy, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
