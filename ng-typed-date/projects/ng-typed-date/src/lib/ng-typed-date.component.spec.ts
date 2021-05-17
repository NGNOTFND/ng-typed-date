import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgTypedDateComponent } from './ng-typed-date.component';

describe('NgTypedDateComponent', () => {
  let component: NgTypedDateComponent;
  let fixture: ComponentFixture<NgTypedDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgTypedDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTypedDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should typed data', () => {

    const input = fixture.debugElement.query(By.css('input'));
    const el = input.nativeElement;

    el.value = '2020-03-23';
    el.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.date).toEqual(new Date(2020, 2, 23))

  });
});
