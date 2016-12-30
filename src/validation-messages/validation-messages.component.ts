import { Component, Input, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidationMessagesMapFn } from './validation-messages-map-fn';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
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
    @Inject('validationMessageMapper') private mapper: ValidationMessagesMapFn
  ) { }

  ngOnInit() {
    if (this.control) {
      this.errorMessages$ = this.control.statusChanges
        .map((status: string) => {
          if (this.control.touched && status === 'INVALID') {
            let keys = Object.keys(this.control.errors);
            let first = keys.shift();
            return this.mapper(first, this.control.errors[first]);
          }
          return null;
        });
      // update so that out observable above emits the inital value
      this.control.updateValueAndValidity();

    } else if (this.group) {
      this.errorMessages$ = this.group.statusChanges
        .map((status: string) => {
          if (this.group.touched && status === 'INVALID') {
            // since it's invalid we assume that it has at least 1 error in the `this.group.errors` object
            let errorKeys = Object.keys(this.group.errors);
            return this.mapper(errorKeys[0], this.group.errors[errorKeys[0]]);
          }
          return null;
        });
      // update so that out observable above emits the inital value
      this.group.updateValueAndValidity();
    }
  }
}
