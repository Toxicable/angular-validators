import { Component, Input, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidationMessagesMapFn } from './validation-messages-map-fn';

@Component({
selector: 'av-validation-messages',
template: `<span *ngIf="errorMessage !== null">{{errorMessage}}</span>`

})
export class ValidationMessagesComponent {
    @Input() control: FormControl;
    @Input() group: FormGroup;
    constructor(
      @Inject('validationMessageMapper') private mapper: ValidationMessagesMapFn
    ) { }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return this.mapper(propertyName, this.control.errors[propertyName]);
            }
        }

        return null;
    }
}
