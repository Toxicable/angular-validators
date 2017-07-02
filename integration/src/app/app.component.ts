import { Component } from '@angular/core';
import { FormValidators } from 'ngx-validators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'integration-app',
  template: `
<form [formGroup]='myForm'>
  <input formControlName='password' />
  <av-validation-messages [control]='myForm.get('password')'></av-validation-messages>
  <input formControlName='confirmPassword' />
  <av-validation-messages [control]='myForm.get('confirmPassword')'></av-validation-messages>
</form>
`
})
export class AppComponent {
  myForm: FormGroup;
  constructor(private fb: FormBuilder){
    this.myForm = fb.group({
      password: ['', [FormValidators.required]],
      confirmPassword: ['']
    }, {validator: FormValidators.comparison('password', 'confirmPassword')})
  }
}
