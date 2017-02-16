import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'
import { ValidationMessagesModule , FormValidators} from '../../'

@Component({
  selector: 'ngc-spec-component',
  template:
  `<form [formGroup]="myForm">
  <input formControlName="password" />
  <av-validation-messages [control]="myForm.get('password')"></av-validation-messages>

  <input formControlName="confirmPassword" />
  <av-validation-messages [control]="myForm.get('confirmPassword')"></av-validation-messages>
</form>
`
})
export class NgcSpecComponent {
  myForm: FormGroup;
  constructor(private fb: FormBuilder){
    this.myForm = fb.group({
      password: ['', [FormValidators.required]],
      confirmPassword: ['']
    }, {validator: FormValidators.comparison('password', 'confirmPassword')})
  }

 }

@NgModule({
  imports: [
    CommonModule,
    ValidationMessagesModule,
    ReactiveFormsModule
  ],
  declarations: [ NgcSpecComponent ]
})
export class NgcSpecModule { }
