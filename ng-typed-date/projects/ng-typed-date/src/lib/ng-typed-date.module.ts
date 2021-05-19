import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgTypedDateComponent } from './ng-typed-date.component';
import { NgModelDateDirective } from './ng-model-date.directive';



@NgModule({
  declarations: [NgTypedDateComponent, NgModelDateDirective],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [NgTypedDateComponent, NgModelDateDirective]
})
export class NgTypedDateModule { }
