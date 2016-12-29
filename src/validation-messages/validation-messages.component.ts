import { Component, Input, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidationMessagesMapFn } from './validation-messages-map-fn';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
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
  errorMessage$: Observable<string>;
  ngOnInit() {
    // if (this.control) {
    //   this.errorMessage$ = this.control.valueChanges
    //     .map(value => {
    //       for (let propertyName in this.control.errors) {
    //         if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
    //           return this.mapper(propertyName, this.control.errors[propertyName]);
    //         }
    //       }
    //       return null;
    //     })
    // } else if (this.group) {

    // }
  }
  get errorMessage() {
    if (this.control) {
      for (let propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
          return this.mapper(propertyName, this.control.errors[propertyName]);
        }
      }

      return null;
    }
    else if (this.group) {
      for (let propertyName in this.group.errors) {
        if (this.group.errors.hasOwnProperty(propertyName) && this.group.touched) {
          return this.mapper(propertyName, this.group.errors[propertyName]);
        }
      }

      return null;
    }
  }
}
