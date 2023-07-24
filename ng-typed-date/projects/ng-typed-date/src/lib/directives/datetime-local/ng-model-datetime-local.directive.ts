
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
  selector: '[type=datetime-local][ngModelDate]:not([formControlName]):not([formControl])',
  providers: [
  ],
  host: {
    '(change)': 'onChangeDate($event.target.value)',
  }
})
export class NgModelDatetimeLocalDirective extends NgModel implements OnInit, ControlValueAccessor {

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
        this.control.setValue(this.formatDate(this._ngModelDate));
        this.onTouched();
      }
    } else {
      this._ngModelDate = null;
    }

  }

  public get min(): Date | string {
    return this._min;
  }
  @Input() public set min(value: Date | string) {
    if (this._min != value) {
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
    private renderer: Renderer2) {
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

  onChangeDate(value: string) {
    this._ngModelDate = this.parseDateString(value);
    this.control.setValue(this.formatDate(this._ngModelDate));
    this.ngModelDateChange.emit(this._ngModelDate);
  }

  private parseDateString(date: string): Date {
    if (!date)
      return undefined;

    date = date.replace('T', '-');
    var parts = date.split('-');
    var timeParts = parts[3].split(':');
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), Number(timeParts[0]), Number(timeParts[1]));

  }

  private formatDate(date: Date | string) {

    if (this.isValidDate(date))
      return this.toDateString(new Date(date));

    return null;
  }

  private toDateString(date: Date): string {
    return (date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate())).slice(-2))
      + 'T' + date.toTimeString().slice(0, 5);
  }

  private setPropertyElement(propertyName: string, value: any) {
    this.renderer.setProperty(this.elementRef.nativeElement, propertyName, value);
  }

  private isValidDate(value: Date | string) {
    if (!value)
      return false;

    if (value instanceof Date)
      return !isNaN(value.getTime());

    return !isNaN(Date.parse(value));
  }

}
