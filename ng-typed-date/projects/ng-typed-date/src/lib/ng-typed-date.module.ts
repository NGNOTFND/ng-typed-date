import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModelDateDirective } from './directives/date/ng-model-date.directive';
import { NgModelDatetimeLocalDirective } from './directives/datetime-local/ng-model-datetime-local.directive';



@NgModule({
  declarations: [NgModelDateDirective, NgModelDatetimeLocalDirective],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [NgModelDateDirective, NgModelDatetimeLocalDirective]
})
export class NgTypedDateModule { }
