import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ng-typed-date',
  template: `
    <input
      type="date"
      id="date"
      name="date"
      [min]="min"
      [max]="min"
      [class]="class"
      (change)="onChangeDate($event.target.value)"
      [ngModel]="date | date:'yyyy-MM-dd'"
      (ngModelChange)="date = $event"
      [ngModelOptions]="{updateOn: 'blur'}"
      [required]="required"
      [disabled]="disabled">
  `,
  styles: [
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgTypedDateComponent),
      multi: true
    }
  ]
})
export class NgTypedDateComponent implements OnInit {
  private _date: Date;

  public get date(): Date {
    return this._date;
  }
  public set date(value: Date) {
    this._date = value;
    this.onChange(this._date);
  }
  @Input() min: Date;
  @Input() max: Date;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() class: string;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeDate(event: string) {
    const [year, month, day] = event.split('-');
    this.date = new Date(Number(year), Number(month) - 1, Number(day));
  }

  writeValue(obj: any): void {
    this.date = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange: any = () => { };
  onTouch: any = () => { };

}
