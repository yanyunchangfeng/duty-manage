import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
const routes: Routes = [
  {
    path: 'index',
    component: HomeComponent,
    children: [
      {
        path: 'duty',
        loadChildren: '../duty/duty.module#DutyModule',
        data: { preload: true }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [HomeComponent],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
