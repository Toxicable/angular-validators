import { Injectable } from '@angular/core';
import { ValidationMessagesMap } from './validation-messages-map';
@Injectable()
export class ValidationMessagesService {

  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config: ValidationMessagesMap = {
      required: 'Required',
      requiredTrue: 'Required True',
      minLength: `Minimum length ${validatorValue.requiredLength}`,
      maxLength: `Minimum length ${validatorValue.requiredLength}`,
      invalidUrl: `Invalid url`,
      invalidCreditCard: 'Invalid credit card number',
      invalidEmail: 'Invalid email address',
      invalidNumber: `Invalid number`,
      invalidAlpha: 'Invalid character',
      invalidComparison: 'Fields must match'
    };

    return config[validatorName];
  }
}
