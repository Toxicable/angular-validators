import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessagesService } from './validation-messages.service';

@Component({
selector: 'av-validation-messages',
template: `<span *ngIf="errorMessage !== null">{{errorMessage}}</span>`

})
export class ValidationMessagesComponent {
    @Input() control: FormControl;
    constructor( private validator: ValidationMessagesService) { }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return this.validator.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }

        return null;
    }
}
