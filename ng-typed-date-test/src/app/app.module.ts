import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgTypedDateModule } from '@ng-not-found/ng-typed-date';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgTypedDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
