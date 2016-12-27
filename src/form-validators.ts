import { FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { InvalidValidationResult } from './invalid-validation-result';

export class FormValidators {
    static emailValidator(control: AbstractControl): InvalidValidationResult {
        const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        return control.value.match(regex) ? null : { invalidEmailAddress: true };
    }

    static urlValidator(control: AbstractControl): InvalidValidationResult {
        const regex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;;
        return control.value.match(regex) ? null : { invalidUrl : true };
    }

    static passwordValidator(control: AbstractControl): InvalidValidationResult  {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        const regex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/;
        return control.value.match(regex) ? null :  { invalidPassword: true };
    }

    static numberValidator(control: AbstractControl): InvalidValidationResult {
        const regex = /^\d/;
        return control.value.match(regex) ? null : { invalidNumber: true };
    }

    static alphaValidator(control: AbstractControl): InvalidValidationResult {
        const regex =  /^[A-Za-z]+$/;
        return control.value.match ? null : { invalidAlphaChar: true };
    }

    static comparisonValidator(field1: string, field2: string){
        return function(group: FormGroup): InvalidValidationResult{
            return group.controls[field1].value === group.controls[field2].value ? null : { invalidComparison : true };
        }
    }
}