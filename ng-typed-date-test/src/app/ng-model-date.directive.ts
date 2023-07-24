import { DatePipe } from '@angular/common';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  Renderer2
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NgModel,
  Validators
} from '@angular/forms';

@Directive({
  selector: '[type=date][ngModelDate]:not([formControlName]):not([formControl])',
  providers: [
    DatePipe
  ],
  host: {
    '(change)': 'onChangeDate($event.target.value)',
    '(blur)': 'onBlur()',
  }
})
export class NgModelDateDirective extends NgModel implements OnInit, ControlValueAccessor {

  private _ngModelDate: Date | null;
  private _min: Date | string;
  private _max: Date | string;

  public get ngModelDate(): any {
    return this._ngModelDate;
  }
  @Input() public set ngModelDate(value: any) {
    if (this.isValidDate(value)) {
      if (this._ngModelDate != value) {
        this._ngModelDate = value;
        this.onBlur();
      }
    } else {
      this._ngModelDate = null;
    }

  }

  public get min(): Date | string {
    return this._min;
  }
  @Input() public set min(value: Date | string) {
    if(this._min != value) {
      this._min = value;
      this.setSettingsInputDate('min', this._min);
    }
  }

  public get max(): Date | string {
    return this._max;
  }
  @Input() public set max(value: Date | string) {
    if (this._max != value) {
      this._max = value;
      this.setSettingsInputDate('max', this._max);
    }
  }

  @Input() required: boolean | string = null;

  @Output() ngModelDateChange = new EventEmitter<Date>();

  constructor(
    @Optional() @Host() parent: ControlContainer,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private datePipe: DatePipe) {
    super(parent, null, null, null);

    super.valueAccessor = this;
    super.options = { updateOn: 'blur' };
    super.model = this.ngModelDate;

  }

  writeValue(value: any): void {
    this.setPropertyElement('value', value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.setPropertyElement('disabled', isDisabled);
  }

  ngOnInit(): void {
    this.setRequired();

    this.setSettingsInputDate('min', this.min);
    this.setSettingsInputDate('max', this.max);
    this.onBlur();
  }

  private setRequired() {
    if (this.required !== null) {
      this.control.setValidators(Validators.required);
    }
  }

  private setSettingsInputDate(propertyName: string, value: Date | string) {
    if (value) {
      this.setPropertyElement(propertyName, this.formatDate(value));
    }
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  onChangeDate(event: string) {
    const [year, month, day] = event.split('-');
    this._ngModelDate = new Date(Number(year), Number(month) - 1, Number(day), 0, 0, 0);
    this.ngModelDateChange.emit(this._ngModelDate);
  }

  onBlur(): void {
    this.control.setValue(this.formatDate(this._ngModelDate));
    this.onTouched();
  }

  private formatDate(date: Date | string) {

    if (this.isValidDate(date))
      return this.datePipe.transform(date, 'yyyy-MM-dd');

    return null;
  }

  private setPropertyElement(propertyName: string, value: any) {
    this.renderer.setProperty(this.elementRef.nativeElement, propertyName, value);
  }

  private isValidDate(value: Date | string) {
    if(!value)
      return false;

    if (value instanceof Date)
      return !isNaN(value.getTime());

    return !isNaN(Date.parse(value));
  }

}
