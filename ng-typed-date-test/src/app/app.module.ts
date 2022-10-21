import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModelDateDirective } from './ng-model-date.directive';
import { NgModelDatetimeLocalDirective } from './ng-model-datetime-local.directive';

@NgModule({
  declarations: [
    AppComponent,
    NgModelDatetimeLocalDirective,
    NgModelDateDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NgModelDatetimeLocalDirective]
})
export class AppModule { }
