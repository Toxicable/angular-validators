import { FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { InvalidValidationResult } from './invalid-validation-result';
import { Validators } from '@angular/forms';

export class FormValidators {

 static emailValidator(control: AbstractControl): InvalidValidationResult {
    const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const validator =  Validators.pattern(regex);
    return validator(control) == null ? null : { invalidEmail: true };
  }

 static urlValidator(control: AbstractControl): InvalidValidationResult {
    const regex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    const validator =  Validators.pattern(regex);
    return validator(control) == null ? null : { invalidUrl: true };
  }

  static numberValidator(control: AbstractControl): InvalidValidationResult {
    const regex = /^\d/;
    const validator =  Validators.pattern(regex);
    return validator(control) == null ? null : { invalidNumber: true };
  }

 static alphaValidator(control: AbstractControl): InvalidValidationResult {
    const regex = /^[A-Za-z]+$/;
    const validator =  Validators.pattern(regex);
    return validator(control) == null ? null : { invalidAlpha: true };
  }

// cross field validators
 static comparisonValidator(field1: string, field2: string) {
    return function (group: FormGroup): InvalidValidationResult {
      return group.controls[field1].value === group.controls[field2].value ? null : { invalidComparison: true };
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
