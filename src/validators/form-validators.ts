import { FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { InvalidValidationResult } from './invalid-validation-result';
import { Validators } from '@angular/forms';

export class FormValidators {
  static creditCardValidator(control: AbstractControl): InvalidValidationResult {
    const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    const validator = Validators.pattern(regex);
    return validator(control) == null ? null : { invalidCreditCard: true };
  }

  static emailValidator(control: AbstractControl): InvalidValidationResult {
    const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const validator = Validators.pattern(regex);
    return validator(control) == null ? null : { invalidEmail: true };
  }

  static urlValidator(control: AbstractControl): InvalidValidationResult {
    const regex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    const validator = Validators.pattern(regex);
    return validator(control) == null ? null : { invalidUrl: true };
  }

  static numberValidator(control: AbstractControl): InvalidValidationResult {
    const regex = /^\d/;
    const validator = Validators.pattern(regex);
    return validator(control) == null ? null : { invalidNumber: true };
  }

  static alphaValidator(control: AbstractControl): InvalidValidationResult {
    const regex = /^[A-Za-z]+$/;
    const validator = Validators.pattern(regex);
    return validator(control) == null ? null : { invalidAlpha: true };
  }

  // cross field validators
  /**
  * A validator that takes the field names of two fields in a group and validates that they're equal
  */
  static comparisonValidator(field1Name: string, field2Name: string) {
    return function (group: FormGroup): InvalidValidationResult {
      if(group.controls === undefined) { throw new Error('Comparison validator must be on a Form Group not Form Control') }
      let value1 = group.controls[field1Name].value;
      let value2 = group.controls[field2Name].value;
      return value1 === value2 ? null
      : { invalidComparison: { field1Name, field2Name, field1Value: value1, field2Value: value2 } };
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
