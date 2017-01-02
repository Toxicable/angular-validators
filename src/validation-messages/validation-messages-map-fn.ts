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
    invalidComparison: `Field: ${validatorValue.invalidField} must match: ${validatorValue.comparisonField}`,
    invalidFirstCapital: 'First character must be capital',
    range: `${validatorValue.value} must be in the range: ${validatorValue.min}-${validatorValue.max}`,
    min: `${validatorValue.value} must be greater than ${validatorValue.min}`,
    max: `${validatorValue.value} must be less than than ${validatorValue.max}`,
  };
  return config[validatorName];
}
