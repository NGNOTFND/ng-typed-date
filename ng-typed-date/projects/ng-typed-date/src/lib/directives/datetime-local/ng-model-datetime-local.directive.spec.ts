import { DatePipe } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { Validators } from '@angular/forms';
import { Mock } from 'ts-mocks';
import { NgModelDatetimeLocalDirective } from './ng-model-datetime-local.directive';

describe('NgModelDateDirective', () => {

  let directive: NgModelDatetimeLocalDirective;
  let rendererMock: Mock<Renderer2>;

  const elementRefMock = {
    nativeElement: {

    }
  };

  beforeEach(() => {

    rendererMock = new Mock<Renderer2>();
    rendererMock.setup(x => x.setProperty).is((x, y, z) => void (0));
    directive = new NgModelDatetimeLocalDirective(null, elementRefMock, rendererMock.Object);

  });

  it('should set config direcitve', () => {

    expect(directive.valueAccessor).toBe(directive);
    expect(directive.options).toEqual({ updateOn: 'blur' });
    expect(directive.model).toBe(directive.ngModelDate);

  });

  it('should set required', () => {

    directive.required = true;

    spyOn(directive.control, 'setValidators');

    directive.ngOnInit();

    expect(directive.control.setValidators).toHaveBeenCalledWith(Validators.required);

  });

  it(`should set null in min`, () => {

    directive.min = new Date('');

    directive.ngOnInit();

    expect(rendererMock.Object.setProperty).toHaveBeenCalledWith(elementRefMock.nativeElement, 'min', null);

  });

  it(`should set null in max`, () => {

    directive.max = new Date('');

    directive.ngOnInit();

    expect(rendererMock.Object.setProperty).toHaveBeenCalledWith(elementRefMock.nativeElement, 'max', null);

  });

  [{
    case: {
      max: new Date(2021, 4, 20)
    },
    result: {
      value: '2021-05-20T00:00'
    }
  },
  {
    case: {
      max: '2021-05-21T00:00'
    },
    result: {
      value: '2021-05-21T00:00'
    }
  }]
    .forEach(test => it(`should set max: ${test.result.value}`, () => {

      directive.max = test.case.max;

      directive.ngOnInit();

      expect(rendererMock.Object.setProperty)
        .toHaveBeenCalledWith(elementRefMock.nativeElement, 'max', test.result.value);

    }));


  [{
    case: {
      min: new Date(2021, 4, 20)
    },
    result: {
      value: '2021-05-20T00:00'
    }
  },
  {
    case: {
      min: '2021-05-21T00:00'
    },
    result: {
      value: '2021-05-21T00:00'
    }
  }]
    .forEach(test => it(`should set min: ${test.result.value}`, () => {

      directive.min = test.case.min;

      directive.ngOnInit();

      expect(rendererMock.Object.setProperty)
        .toHaveBeenCalledWith(elementRefMock.nativeElement, 'min', test.result.value);

    }));

  [{
    case: {
      max: null
    },
    result: {
      value: null
    }
  },
  {
    case: {
      max: undefined
    },
    result: {
      value: null
    }
  }]
    .forEach(test => it('not should set max if value is falsy', () => {

      const spy = rendererMock.spyOf(x => x.setProperty);
      spy.calls.reset();

      directive.max = test.case.max;

      directive.ngOnInit();

      expect(rendererMock.Object.setProperty).not.toHaveBeenCalled();

    }));

  [{
    case: {
      min: null
    },
    result: {
      value: null
    }
  },
  {
    case: {
      min: undefined
    },
    result: {
      value: null
    }
  }]
    .forEach(test => it('not should set min if value is falsy', () => {

      const spy = rendererMock.spyOf(x => x.setProperty);
      spy.calls.reset();

      directive.min = test.case.min;

      directive.ngOnInit();

      expect(rendererMock.Object.setProperty).not.toHaveBeenCalled();

    }));


  it('should set value', () => {

    const value = 'value';

    directive.writeValue(value);

    expect(rendererMock.Object.setProperty)
      .toHaveBeenCalledWith(elementRefMock.nativeElement, 'value', value);

  });

  it('should set disabled', () => {

    const isDisabled = true;

    directive.setDisabledState(isDisabled);

    expect(rendererMock.Object.setProperty)
      .toHaveBeenCalledWith(elementRefMock.nativeElement, 'disabled', isDisabled);

  });

  it('should register OnChange', () => {

    const onChange = () => { };

    directive.registerOnChange(onChange);

    expect(directive.onChange).toBe(onChange);

  });

  it('should register OnTouched', () => {

    const onTouched = () => { };

    directive.registerOnTouched(onTouched);

    expect(directive.onTouched).toBe(onTouched);

  });

  it('deve setar valor', () => {

    const data = new Date(2018, 1, 1, 0, 0, 0, 0);

    directive.ngModelDate = data;

    expect(directive.control.value).toEqual('2018-02-01T00:00');

  });

  it(`should set min`, () => {

    directive.min = new Date(2018, 1, 1, 0, 0, 0, 0);

    expect(rendererMock.Object.setProperty).toHaveBeenCalledWith(elementRefMock.nativeElement, 'min', '2018-02-01T00:00');

  });

  it(`should set max`, () => {

    directive.max = new Date(2018, 1, 1, 0, 0, 0, 0);

    expect(rendererMock.Object.setProperty).toHaveBeenCalledWith(elementRefMock.nativeElement, 'max', '2018-02-01T00:00');

  });

});
