import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidators } from '../../lib/index';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  myForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.myForm = fb.group({
      password: ['', [FormValidators.required]],
      confirmPassword: ['']
    }, { validator: FormValidators.comparison('password', 'confirmPassword') });
  }

}
