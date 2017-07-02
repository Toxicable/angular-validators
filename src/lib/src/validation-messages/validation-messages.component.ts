import { VALIDATION_MESSAGE_MAPPER } from './validation-messages.module';
import { Component, Input, Inject, ChangeDetectionStrategy, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { defaultValidationMessageMapper, ValidationMessageMapperFn } from './validation-messages-map';
import 'rxjs/add/operator/map';

@Component({
  selector: 'av-validation-messages',
  template: `<span>{{errorMessages$ | async}}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessagesComponent {
  @Input() control: FormControl | FormGroup;
  errorMessages$: Observable<string>;
  mapper: ValidationMessageMapperFn;

  constructor(
    @Inject(VALIDATION_MESSAGE_MAPPER) @Optional() mapper: ValidationMessageMapperFn
  ) {
    this.mapper = mapper ? mapper : defaultValidationMessageMapper;
  }

  ngOnInit() {
    this.errorMessages$ = this.control.statusChanges
      .map((status: string) => {
        if (this.control.dirty && status === 'INVALID' && this.control.errors) {
          // since it's invalid we assume that it has at least 1 error in the `this.group.errors` object
          let errorKeys = Object.keys(this.control.errors || {});
          return this.mapper(errorKeys[0], this.control.errors[errorKeys[0]]);
        }
        return null;
      });
  }

  ngAfterViewInit() {
    // run the update so that the observable emits the inital value
    this.control.updateValueAndValidity();
  }
}
