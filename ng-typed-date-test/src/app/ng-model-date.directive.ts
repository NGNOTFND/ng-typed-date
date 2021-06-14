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
  selector: '[ngModelDate]:not([formControlName]):not([formControl])',
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
  public get ngModelDate(): any {
    return this._ngModelDate;
  }
  @Input() public set ngModelDate(value: any) {
    if (!isNaN(value)) {
      if (value instanceof Date) {
        if (this._ngModelDate != value) {
          this._ngModelDate = value;
          this.onBlur();
        }
      }
    } else {
      this._ngModelDate = null;
    }

  }
  @Input() required: boolean | string = null;
  @Input() min: Date | string;
  @Input() max: Date | string;

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
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  private setPropertyElement(propertyName: string, value: any) {
    this.renderer.setProperty(this.elementRef.nativeElement, propertyName, value);
  }

}
