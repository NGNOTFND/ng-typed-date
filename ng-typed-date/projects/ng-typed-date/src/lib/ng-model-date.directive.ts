import { Directive, forwardRef, Host, Inject, Optional, Self } from '@angular/core';
import {
  AsyncValidator,
  AsyncValidatorFn,
  ControlContainer,
  ControlValueAccessor,
  NgControl,
  NgModel,
  NG_ASYNC_VALIDATORS,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  ValidatorFn
} from '@angular/forms';

@Directive({
  selector: '[ngModelDate]:not([formControlName]):not([formControl])',
  providers: [{
    provide: NgControl,
    useExisting: forwardRef(() => NgModelDateDirective)
  }]
})
export class NgModelDateDirective extends NgModel {

  constructor(
    @Optional() @Host() parent: ControlContainer,
    @Optional() @Self() @Inject(NG_VALIDATORS) validators: (Validator | ValidatorFn)[],
    @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: (AsyncValidator | AsyncValidatorFn)[],
    @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[]) {
    super(parent, validators, asyncValidators, valueAccessors);

    parent.control.valueChanges.subscribe(x => console.log(x));
  }

}
