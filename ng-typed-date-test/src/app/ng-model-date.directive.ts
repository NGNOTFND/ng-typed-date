import { DatePipe } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, Host, Inject, Input, OnInit, Optional, Output, Renderer2, Self } from '@angular/core';
import {
  AsyncValidator,
  AsyncValidatorFn,
  ControlContainer,
  ControlValueAccessor,
  NgControl,
  NgModel,
  NG_ASYNC_VALIDATORS,
  NG_VALIDATORS,
  Validator,
  ValidatorFn
} from '@angular/forms';

@Directive({
  selector: '[ngModelDate]:not([formControlName]):not([formControl])',
  providers: [
    DatePipe
  ],
  host: {
    '(change)': 'onChangeDate($event.target.value)'
  }
})
export class NgModelDateDirective extends NgModel implements OnInit, AfterViewInit, ControlValueAccessor {

  private _ngModelDate: Date;
  public get ngModelDate(): Date {
    return this._ngModelDate;
  }
  @Input() public set ngModelDate(value: Date) {
    if (this._ngModelDate != value) {
      this._ngModelDate = value;
      this.control.setValue(this.datePipe.transform(this._ngModelDate, 'yyyy-MM-dd'));
    }
  }

  @Output() ngModelDateChange = new EventEmitter<Date>();

  constructor(
    @Optional() @Host() parent: ControlContainer,
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private datePipe: DatePipe) {
    super(parent, validators, asyncValidators, null);

    super.valueAccessor = this;
    super.options = { updateOn: 'blur', name: this.elementRef.nativeElement.name };
    super.model = this.ngModelDate;

  }
  writeValue(value: any): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

  }

  onChange: any = () => { };
  onTouched: any = () => { };

  onChangeDate(event: string) {
    const [year, month, day] = event.split('-');
    this._ngModelDate = new Date(Number(year), Number(month) - 1, Number(day));
    this.ngModelDateChange.emit(this._ngModelDate);
  }

}
