import { FormControl } from '@angular/forms';

export class FormValidators{
    emailValidator(control: FormControl) {
        if (control.value.match(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)) {
            return null;
        } else {
            return { invalidEmailAddress: true };
        }
    }

    passwordValidator(control: FormControl) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { invalidPassword: true };
        }
    }
}