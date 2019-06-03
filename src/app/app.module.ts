import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { DialogModule,DialogService} from 'yycf-dialog/components'
import { AppRoutingModule } from './app-routing.module';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DialogModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [SelectivePreloadingStrategy,DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
