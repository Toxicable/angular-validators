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

  describe('email', () => {
    beforeEach(() => {
      invalidResult = { invalidEmailAddress: true };
    })

    it('Should be valid', () => {
      control.setValue('iamemail@email.com')
      expect(FormValidators.emailValidator(control)).toBeNull();
    });

    it('Should be invalid', () => {
      control.setValue('i am not an email')
      expect(FormValidators.emailValidator(control)).toEqual(invalidResult);
    });
  });

  describe('comparison validator', () => {
    beforeEach(() => {
      invalidResult = { invalidComparison: true };
    });

    it('should return null when equal', () => {
      group.controls['field1'].setValue('hi');
      group.controls['field2'].setValue('hi');
      let validator = FormValidators.comparisonValidator('field1', 'field2');
      expect(validator(group)).toBeNull();
    });

    it('should return error when not equal', () => {
      group.controls['field1'].setValue('I am not equal');
      group.controls['field2'].setValue('hi');
      let validator = FormValidators.comparisonValidator('field1', 'field2');
      expect(validator(group)).toEqual(invalidResult);
    });
  });


// re-testing Angular's Validator wrappers
  describe('required', () => {
    it('should error on an empty string',
      () => { expect(FormValidators.required(new FormControl(''))).toEqual({ 'required': true }); });

    it('should error on null',
      () => { expect(FormValidators.required(new FormControl(null))).toEqual({ 'required': true }); });

    it('should not error on a non-empty string',
      () => { expect(FormValidators.required(new FormControl('not empty'))).toBeNull(); });

    it('should accept zero as valid',
      () => { expect(FormValidators.required(new FormControl(0))).toBeNull(); });
  })

  describe('requiredTrue', () => {
    it('should error on false',
      () => expect(FormValidators.requiredTrue(new FormControl(false))).toEqual({ 'required': true }));

    it('should not error on true',
      () => expect(FormValidators.requiredTrue(new FormControl(true))).toBeNull());
  });

  describe('minLength', () => {
    it('should not error on an empty string',
      () => { expect(FormValidators.minLength(2)(new FormControl(''))).toBeNull(); });

    it('should not error on null',
      () => { expect(FormValidators.minLength(2)(new FormControl(null))).toBeNull(); });

    it('should not error on undefined',
      () => { expect(FormValidators.minLength(2)(new FormControl(null))).toBeNull(); });

    it('should not error on valid strings',
      () => { expect(FormValidators.minLength(2)(new FormControl('aa'))).toBeNull(); });

    it('should error on short strings', () => {
      expect(FormValidators.minLength(2)(new FormControl('a'))).toEqual({
        'minlength': { 'requiredLength': 2, 'actualLength': 1 }
      });
    });

    it('should not error when FormArray has valid length', () => {
      const fa = new FormArray([new FormControl(''), new FormControl('')]);
      expect(FormValidators.minLength(2)(fa)).toBeNull();
    });

    it('should error when FormArray has invalid length', () => {
      const fa = new FormArray([new FormControl('')]);
      expect(FormValidators.minLength(2)(fa)).toEqual({
        'minlength': { 'requiredLength': 2, 'actualLength': 1 }
      });
    });
  });

  describe('maxLength', () => {
    it('should not error on an empty string',
      () => { expect(FormValidators.maxLength(2)(new FormControl(''))).toBeNull(); });

    it('should not error on null',
      () => { expect(FormValidators.maxLength(2)(new FormControl(null))).toBeNull(); });

    it('should not error on valid strings',
      () => { expect(FormValidators.maxLength(2)(new FormControl('aa'))).toBeNull(); });

    it('should error on long strings', () => {
      expect(FormValidators.maxLength(2)(new FormControl('aaa'))).toEqual({
        'maxlength': { 'requiredLength': 2, 'actualLength': 3 }
      });
    });

    it('should not error when FormArray has valid length', () => {
      const fa = new FormArray([new FormControl(''), new FormControl('')]);
      expect(FormValidators.maxLength(2)(fa)).toBeNull();
    });

    it('should error when FormArray has invalid length', () => {
      const fa = new FormArray([new FormControl(''), new FormControl('')]);
      expect(FormValidators.maxLength(1)(fa)).toEqual({
        'maxlength': { 'requiredLength': 1, 'actualLength': 2 }
      });
    });
  });

  function validator(key: string, error: any) {
    return function (c: AbstractControl) {
      const r: { [k: string]: string } = {};
      r[key] = error;
      return r;
    };
  }

  describe('compose', () => {
    it('should return null when given null',
      () => { expect(FormValidators.compose(null)).toBe(null); });

    it('should collect errors from all the validators', () => {
      const c = FormValidators.compose([validator('a', true), validator('b', true)]);
      expect(c(new FormControl(''))).toEqual({ 'a': true, 'b': true });
    });

    it('should run validators left to right', () => {
      const c = FormValidators.compose([validator('a', 1), validator('a', 2)]);
      expect(c(new FormControl(''))).toEqual({ 'a': 2 });
    });

    it('should return null when no errors', () => {
      const c = FormValidators.compose([FormValidators.nullValidator, FormValidators.nullValidator]);
      expect(c(new FormControl(''))).toBeNull();
    });

    it('should ignore nulls', () => {
      const c = FormValidators.compose([null, FormValidators.required]);
      expect(c(new FormControl(''))).toEqual({ 'required': true });
    });
  });

});
