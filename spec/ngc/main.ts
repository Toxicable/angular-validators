import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'
import { ValidationMessagesModule , FormValidators} from '../../'

@Component({
  selector: 'ngc-spec-component',
  template:
  `<form [formGroup]="myForm">
  <input formControlName="password" />
  <av-validation-messages [control]="myForm.controls.password"></av-validation-messages>

  <input formControlName="confirmPassword" />
  <av-validation-messages [control]="myForm.controls.confirmPassword"></av-validation-messages>

  <av-validation-messages [group]="myForm"></av-validation-messages>
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
    ValidationMessagesModule.withConfig(),
    ReactiveFormsModule
  ],
  declarations: [ NgcSpecComponent ]
})
export class NgcSpecModule { }
