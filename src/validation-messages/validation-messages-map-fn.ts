import { ValidationMessageMap } from './validation-messages-map';

export interface ValidationMessageMapperFn {
  (validatorName: string, validatorValue?: any): string;
}
export function defaultValidationMessageMapper(validatorName: string, validatorValue?: any): string {
  let config: ValidationMessageMap = {
    required: 'Required',
    minLength: `Minimum length ${validatorValue.requiredLength}`,
    maxLength: `Minimum length ${validatorValue.requiredLength}`,
    invalidUrl: `Invalid url`,
    invalidCreditCard: 'Invalid credit card number',
    invalidEmail: 'Invalid email address',
    invalidNumber: `Invalid number`,
    invalidAlpha: 'Invalid character',
    invalidComparison: `Field: ${validatorValue.field1Name} must match ${validatorValue.field2Name}`,
    invalidFirstCapital: 'First character must be capital'
  };
  return config[validatorName];
}
