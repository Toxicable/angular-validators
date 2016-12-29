import { ValidationMessagesMap } from './validation-messages-map';

export interface ValidationMessagesMapFn {
  (validatorName: string, validatorValue?: any): string;
}
export function defaultValidationMessagesMapper(validatorName: string, validatorValue?: any): string {
  let config: ValidationMessagesMap = {
    required: 'Required',
    minLength: `Minimum length ${validatorValue.requiredLength}`,
    maxLength: `Minimum length ${validatorValue.requiredLength}`,
    invalidUrl: `Invalid url`,
    invalidCreditCard: 'Invalid credit card number',
    invalidEmail: 'Invalid email address',
    invalidNumber: `Invalid number`,
    invalidAlpha: 'Invalid character',
    invalidComparison: `Field: ${validatorValue.field1Name} must match ${validatorValue.field2Name}`
  };
  return config[validatorName];
}
