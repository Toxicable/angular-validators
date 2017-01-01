import { Component, Input, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidationMessageMapperFn } from './validation-messages-map-fn';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'av-validation-messages',
  template: `<span>{{errorMessages$ | async}}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessagesComponent {
  @Input() control: FormControl;
  @Input() group: FormGroup;
  errorMessages$: Observable<string>;

  constructor(
    @Inject('validationMessageMapper') private mapper: ValidationMessageMapperFn
  ) { }

  ngOnInit() {
    if (this.control) {
      this.errorMessages$ = this.control.statusChanges
        .map((status: string) => {
          if (this.control.touched && status === 'INVALID') {
            // since it's invalid we assume that it has at least 1 error in the `this.group.errors` object
            let errorKeys = Object.keys(this.control.errors);
            return this.mapper(errorKeys[0], this.control.errors[errorKeys[0]]);
          }
          return null;
        });
      // run the update so that the observable emits the inital value
      this.control.updateValueAndValidity();

    } else if (this.group) {
      this.errorMessages$ = this.group.statusChanges
        .map((status: string) => {
          if (this.group.touched && status === 'INVALID') {
            let errorKeys = Object.keys(this.group.errors);
            return this.mapper(errorKeys[0], this.group.errors[errorKeys[0]]);
          }
          return null;
        });
      this.group.updateValueAndValidity();
    }
  }
}
