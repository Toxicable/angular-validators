import {
  FormControl,
  FormGroup,
  ValidatorFn,
  AbstractControl,
  FormArray
} from '@angular/forms';
import { InvalidValidationResult } from './invalid-validation-result';
import { Validators } from '@angular/forms';

export class FormValidators {

//requiredWith
//requiredWithout
//requiredWithAll
//requriedWithoutAll
//requiredUnless
//coordinates https://en.wikipedia.org/wiki/World_Geodetic_System

  /**
  * Requried when the predicate evaluates to true
  */
  static requiredWhen(pred: (control: AbstractControl) => boolean):ValidatorFn{
    return function (control: AbstractControl): InvalidValidationResult{
      return pred(control) ? this.required(control) : null;
    }
  }

  static arrayAtLeastOneHasToBeRequired() {
    return function (array: FormArray): InvalidValidationResult {
      let validControls = array.controls.filter((group: FormGroup) => {
          let valid =  FormValidators.requiredGroup(group) === null;
          return valid;
      });
      return validControls.length >= 1 ? null : { invalidSomethng: true };
    };
  }

  /**
  * Applies the required validator on each child control
  */
  static requiredGroup(group: FormGroup): InvalidValidationResult {
    let controlNames = Object.keys(group.controls);
    let validControls = controlNames
      .filter(controlName => this.required(group.controls[controlName]) == null);

    return validControls.length === controlNames.length ? null : { requiredGroup: { validControls }};
  }

  static range(min?: number, max?: number): ValidatorFn {
    return function (control: AbstractControl): InvalidValidationResult {
      let value = parseInt(control.value);
      return value > max || value < min ? { range: { value, min, max } } : null;
    };
  }

  static minValue(min: number): ValidatorFn {
    return function(control: AbstractControl): InvalidValidationResult {
      const validator = FormValidators.range(min);
      const value = parseInt(control.value);
      return validator(control) === null ? null : { min: { value, min: min } };
    };
  }

  static maxValue(max: number): ValidatorFn {
    return function (control: AbstractControl): InvalidValidationResult {
      const validator = FormValidators.range(undefined, max);
      const value = parseInt(control.value);
      return validator(control) === null ? null : { max: { value, max: max } };
    };
  }

  static creditCard(control: AbstractControl): InvalidValidationResult {
    const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    const validator = Validators.pattern(regex);
    return validator(control) == null ? null : { invalidCreditCard: true };
  }

  static email(control: AbstractControl): InvalidValidationResult {
    const regex = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;;
    const validator = Validators.pattern(regex);
    return validator(control) == null ? null : { invalidEmail: true };
  }

  static url(control: AbstractControl): InvalidValidationResult {
    const regex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    const validator = Validators.pattern(regex);
    return validator(control) == null ? null : { invalidUrl: true };
  }

  static number(control: AbstractControl): InvalidValidationResult {
    const regex = /^\d/;
    const validator = Validators.pattern(regex);
    return validator(control) == null ? null : { invalidNumber: true };
  }

  static alpha(control: AbstractControl): InvalidValidationResult {
    const regex = /^[A-Za-z]+$/;
    const validator = Validators.pattern(regex);
    return validator(control) == null ? null : { invalidAlpha: true };
  }

  static firstCap(control: AbstractControl): InvalidValidationResult {
    const regex = /^[A-Z]/;
    const validator = Validators.pattern(regex);
    return validator(control) == null ? null : { invalidFirstCapital: true };
  }

  /**
  * Depricatedm as validator is being merged with Core: https://github.com/angular/angular/pull/14052
  */
  static compareFields(field1Name: string, field2Name: string) {
    return function (group: FormGroup): InvalidValidationResult {
      if (group.controls === undefined) { throw new Error('Comparison validator must be on a Form Group not Form Control') }
      let value1 = group.controls[field1Name].value;
      let value2 = group.controls[field2Name].value;
      return value1 === value2 ? null
        : { invalidComparison: { field1Name, field2Name, field1Value: value1, field2Value: value2 } };
    };
  }

  /**
  * Depricatedm as validator is being merged with Core: https://github.com/angular/angular/pull/14052
  */
  static comparison(...fields: string[]) {
    return function (group: FormGroup): InvalidValidationResult {
      if (group.controls === undefined) { throw new Error('Comparison validator must be on a Form Group not Form Control'); }
      if (!fields) { throw new Error('You must pass the names of at least 2 fields'); }
      if (fields.length < 2) { throw new Error('You must pass the names of at least 2 fields'); }

      for (let fieldName of fields) {

        let field = group.controls[fieldName];
        if (!field) { throw new Error(`Field: ${fieldName} undefined, are you sure that ${fieldName} exists in`); }

        if (field.value !== group.controls[fields[0]].value) {
          return { invalidComparison: { invalidField: fieldName, comparedField: fields[0] } };
        }
      }
      return null;
    };
  }

  // wrappered validators
  static required(control: AbstractControl): InvalidValidationResult {
    return Validators.required(control);
  }

  static requiredTrue(control: AbstractControl): InvalidValidationResult {
    return Validators.requiredTrue(control);
  }

  static minLength(minLength: number): ValidatorFn {
    return Validators.minLength(minLength);
  }

  static maxLength(maxLength: number): ValidatorFn {
    return Validators.maxLength(maxLength);
  }

  static nullValidator(control: AbstractControl): InvalidValidationResult {
    return Validators.nullValidator(control);
  }

  static compose(validators: ValidatorFn[]): ValidatorFn {
    return Validators.compose(validators);
  }

  static composeAsync(validators: ValidatorFn[]): ValidatorFn {
    return Validators.composeAsync(validators);
  }
}
