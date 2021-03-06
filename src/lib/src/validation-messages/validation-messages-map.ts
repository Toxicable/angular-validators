export interface ValidationMessageMap {
  required: string;
  requiredGroup: string;
  minLength: string;
  maxLength: string;
  invalidCreditCard: string;
  invalidUrl: string;
  invalidEmail: string;
  invalidNumber: string;
  invalidAlpha: string;
  invalidComparison: string;
  invalidFirstCapital: string;
  range: string;
  min: string;
  max: string;
}

export interface ValidationMessageMapperFn {
  (validatorName: string, validatorValue?: any): string;
}

export function defaultValidationMessageMapper(validatorName: string, validatorValue?: any): string {
  let config: ValidationMessageMap = {
    required: 'Required',
    requiredGroup: 'All fields in this group are required',
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

