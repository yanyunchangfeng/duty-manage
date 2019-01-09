import { NgModule } from '@angular/core';
import {DutyRoutingModule} from './duty-routing.module';
import {DutyService} from './duty.service';
@NgModule({
  imports: [DutyRoutingModule],
  providers: [DutyService],
})
export class DutyModule {

}
