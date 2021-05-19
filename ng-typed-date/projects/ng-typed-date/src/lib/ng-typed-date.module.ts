import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgTypedDateComponent } from './ng-typed-date.component';



@NgModule({
  declarations: [NgTypedDateComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [NgTypedDateComponent]
})
export class NgTypedDateModule { }
