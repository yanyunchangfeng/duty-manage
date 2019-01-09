import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { DutyCalendarComponent } from './duty-calendar/duty-calendar.component';
import { DutyAlldayComponent } from './duty-allday/duty-allday.component';
import { DutyAmandpmComponent } from './duty-amandpm/duty-amandpm.component';
import { DutyAutoComponent } from './duty-auto/duty-auto.component';
const routes: Routes = [{ path: '', component: DutyCalendarComponent }];
@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [
    DutyCalendarComponent,
    DutyAlldayComponent,
    DutyAmandpmComponent,
    DutyAutoComponent
  ],
  exports: [RouterModule]
})
export class DutyRoutingModule {}
