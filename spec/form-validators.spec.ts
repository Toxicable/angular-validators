import { FormControl, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { FormValidators } from '../src/validators/';
import { InvalidValidationResult } from '../src/validators/invalid-validation-result';

describe('form validators', () => {
  let control: FormControl;
  let group: FormGroup;
  let invalidResult: InvalidValidationResult;

  beforeEach(() => {
    control = new FormControl('');
    group = new FormGroup({
      f1: new FormControl(''),
      f2: new FormControl('')
    });
  });

  describe('first cap', () => {
    beforeEach(() => {
      invalidResult = { invalidFirstCapital: true };
    });
    it('should not error when frst letter is caps', () => {
      control.setValue('Aa');
      expect(FormValidators.firstCap(control)).toBeNull();
    });
    it('should error when frst letter is not caps', () => {
      control.setValue('aa');
      expect(FormValidators.firstCap(control)).toEqual(invalidResult);
    });
    it('should error passed a number', () => {
      control.setValue('55');
      expect(FormValidators.firstCap(control)).toEqual(invalidResult);
    });

  })

  describe('credit card', () => {
    beforeEach(() => {
      invalidResult = { invalidCreditCard: true };
    });
    it('should not error for visa', () => {
      control.setValue('4111111111111111');
      expect(FormValidators.creditCard(control)).toBeNull();
    });
    it('should not error for master card', () => {
      control.setValue('5555555555554444');
      expect(FormValidators.creditCard(control)).toBeNull();
    });
    it('should not error for american express', () => {
      control.setValue('378282246310005');
      expect(FormValidators.creditCard(control)).toBeNull();
    });
    it('should not error for diners club', () => {
      control.setValue('30569309025904');
      expect(FormValidators.creditCard(control)).toBeNull();
    });
    it('should not error for discover', () => {
      control.setValue('6011111111111117');
      expect(FormValidators.creditCard(control)).toBeNull();
    });
    it('should not error for jbc', () => {
      control.setValue('3530111333300000');
      expect(FormValidators.creditCard(control)).toBeNull();
    });
  });

  describe('url', () => {
    beforeEach(() => {
      invalidResult = { invalidUrl: true };
    });

    it('should not error when valid', () => {
      control.setValue('google.com');
      expect(FormValidators.url(control)).toBeNull();
    });

    it('should error non email', () => {
      control.setValue('i am not an url');
      expect(FormValidators.url(control)).toEqual(invalidResult);
    });
  });

  describe('email', () => {
    beforeEach(() => {
      invalidResult = { invalidEmail: true };
    });

    it('should not error when valid', () => {
      control.setValue('iamemail@email.com');
      expect(FormValidators.email(control)).toBeNull();
    });

    it('should error non email', () => {
      control.setValue('i am not an email')
      expect(FormValidators.email(control)).toEqual(invalidResult);
    });
  });

  describe('number', () => {
    beforeEach(() => {
      invalidResult = { invalidNumber: true };
    });

    it('should not error on a number', () => {
      control.setValue('0123456789');
      expect(FormValidators.number(control)).toBeNull();
    });

    it('should error on alpha', () => {
      control.setValue('a');
      expect(FormValidators.number(control)).toEqual(invalidResult);
    });

    it('should error on symbol', () => {
      control.setValue('~');
      expect(FormValidators.number(control)).toEqual(invalidResult);
    });
  });

  describe('alpha', () => {
    beforeEach(() => {
      invalidResult = { invalidAlpha: true };
    });

    it('should not error on any ascii character', () => {
      control.setValue('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
      expect(FormValidators.alpha(control)).toBeNull();
    });

    it('should error on number', () => {
      control.setValue('1');
      expect(FormValidators.alpha(control)).toEqual(invalidResult);
    });

    it('should error on symbol', () => {
      control.setValue('~');
      expect(FormValidators.alpha(control)).toEqual(invalidResult);
    });
  });

  describe('comparison', () => {

    it('should not error when equal', () => {
      group.controls['f1'].setValue('hi');
      group.controls['f2'].setValue('hi');
      let validator = FormValidators.comparison('f1', 'f2');
      expect(validator(group)).toBeNull();
    });

    it('should error when not equal', () => {
      group.controls['f1'].setValue('I am not equal');
      group.controls['f2'].setValue('hi');
      let validator = FormValidators.comparison('f1', 'f2');
      expect(validator(group)).toEqual({
        invalidComparison: { field1Name: 'f1', field2Name: 'f2', field1Value: 'I am not equal', field2Value: 'hi' }
      });
    });

    it('should throw if passed a form control', () => {
      let validator = FormValidators.comparison('f1', 'f2');
      // cast it to any so we don't get TS errors
      expect(() => validator(<any>new FormControl(''))).toThrow(new Error('Comparison validator must be on a Form Group not Form Control'));
    });
  });
});

