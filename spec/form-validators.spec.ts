import { FormValidators } from '../src/form-validators';
import { FormControl, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { InvalidValidationResult } from '../src/invalid-validation-result';

describe('form validators', () => {
  let control: FormControl;
  let group: FormGroup;
  let invalidResult: InvalidValidationResult;

  beforeEach(() => {
    control = new FormControl('');
    group = new FormGroup({
      field1: new FormControl(''),
      field2: new FormControl('')
    });
  });

describe('credit card', () => {
  beforeEach(() => {
    invalidResult = { invalidCreditCard: true };
  });
  it('should not error for visa', () => {
    control.setValue('4111111111111111');
    expect(FormValidators.creditCardValidator(control)).toBeNull();
  });
  it('should not error for master card', () => {
    control.setValue('5555555555554444');
    expect(FormValidators.creditCardValidator(control)).toBeNull();
  });
  it('should not error for american express', () => {
    control.setValue('378282246310005');
    expect(FormValidators.creditCardValidator(control)).toBeNull();
  });
  it('should not error for diners club', () => {
    control.setValue('30569309025904');
    expect(FormValidators.creditCardValidator(control)).toBeNull();
  });
  it('should not error for discover', () => {
    control.setValue('6011111111111117');
    expect(FormValidators.creditCardValidator(control)).toBeNull();
  });
  it('should not error for jbc', () => {
    control.setValue('3530111333300000');
    expect(FormValidators.creditCardValidator(control)).toBeNull();
  });
});

  describe('url', () => {
    beforeEach(() => {
      invalidResult = { invalidUrl: true };
    });

    it('should not error when valid', () => {
      control.setValue('google.com');
      expect(FormValidators.urlValidator(control)).toBeNull();
    });

    it('should error non email', () => {
      control.setValue('i am not an url');
      expect(FormValidators.urlValidator(control)).toEqual(invalidResult);
    });
  });

  describe('email', () => {
    beforeEach(() => {
      invalidResult = { invalidEmail: true };
    });

    it('should not error when valid', () => {
      control.setValue('iamemail@email.com');
      expect(FormValidators.emailValidator(control)).toBeNull();
    });

    it('should error non email', () => {
      control.setValue('i am not an email')
      expect(FormValidators.emailValidator(control)).toEqual(invalidResult);
    });
  });

  describe('number', () => {
    beforeEach(() => {
      invalidResult = { invalidNumber: true };
    });

    it('should not error on a number', () => {
      control.setValue('0123456789');
      expect(FormValidators.numberValidator(control)).toBeNull();
    });

    it('should error on alpha', () => {
      control.setValue('a');
      expect(FormValidators.numberValidator(control)).toEqual(invalidResult);
    });

    it('should error on symbol', () => {
      control.setValue('~');
      expect(FormValidators.numberValidator(control)).toEqual(invalidResult);
    });
  });

  describe('alpha', () => {
    beforeEach(() => {
      invalidResult = { invalidAlpha: true };
    });

    it('should not error on any ascii character', () => {
      control.setValue('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
      expect(FormValidators.alphaValidator(control)).toBeNull();
    });

    it('should error on number', () => {
      control.setValue('1');
      expect(FormValidators.alphaValidator(control)).toEqual(invalidResult);
    });

    it('should error on symbol', () => {
      control.setValue('~');
      expect(FormValidators.alphaValidator(control)).toEqual(invalidResult);
    });
  });

  describe('comparison', () => {
    beforeEach(() => {
      invalidResult = { invalidComparison: true };
    });

    it('should not error when equal', () => {
      group.controls['field1'].setValue('hi');
      group.controls['field2'].setValue('hi');
      let validator = FormValidators.comparisonValidator('field1', 'field2');
      expect(validator(group)).toBeNull();
    });

    it('should error when not equal', () => {
      group.controls['field1'].setValue('I am not equal');
      group.controls['field2'].setValue('hi');
      let validator = FormValidators.comparisonValidator('field1', 'field2');
      expect(validator(group)).toEqual(invalidResult);
    });
  });
})

