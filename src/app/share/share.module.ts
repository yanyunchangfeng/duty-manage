import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar'
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [CommonModule, FormsModule,CalendarModule, HttpClientModule]
})
export class ShareModule { }
