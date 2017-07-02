import { Component, Input, Inject, ChangeDetectionStrategy, Optional, InjectionToken, NgModule } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { defaultValidationMessageMapper, ValidationMessageMapperFn } from './validation-messages-map';
import 'rxjs/add/operator/map';
import { CommonModule } from '@angular/common';

export const VALIDATION_MESSAGE_MAPPER_TOKEN = new InjectionToken('validationMessageMapper');

@Component({
  selector: 'av-validation-messages',
  template: `<span>{{errorMessages$ | async}}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessagesComponent {
  @Input() set control(_control: FormControl | FormGroup){
    this._control = _control;
    this.errorMessages$ = _control.statusChanges
        .map((status: string) => {
          if (this._control.dirty && status === 'INVALID' && this._control.errors) {
            // since it's invalid we assume that it has at least 1 error in the `this.group.errors` object
            let errorKeys = Object.keys(this._control.errors || {});
            return this.mapper(errorKeys[0], this._control.errors[errorKeys[0]]);
          }
          return null;
        });
  };
  _control: FormControl | FormGroup;
  errorMessages$: Observable<string>;
  mapper: ValidationMessageMapperFn;

  constructor(
    @Inject(VALIDATION_MESSAGE_MAPPER_TOKEN) @Optional() mapper: ValidationMessageMapperFn
  ) {
    this.mapper = mapper ? mapper : defaultValidationMessageMapper;
  }

  ngAfterViewInit() {
    // run the update so that the observable emits the inital value
    setTimeout(() => this._control.updateValueAndValidity());
  }
}


@NgModule({
  imports: [CommonModule],
  declarations: [ValidationMessagesComponent],
  exports: [ValidationMessagesComponent],
})
export class ValidationMessagesModule {
}
