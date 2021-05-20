import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModelDateDirective } from './ng-model-date.directive';



@NgModule({
  declarations: [NgModelDateDirective],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [NgModelDateDirective]
})
export class NgTypedDateModule { }
