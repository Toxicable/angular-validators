import { FormValidators } from '../src/form-validators';
import { FormControl, FormGroup } from '@angular/forms';
import { InvalidValidationResult } from '../src/invalid-validation-result';

describe('Form validators', () => {
    let control: FormControl;
    let group: FormGroup;
    let invalidResult: InvalidValidationResult;

    beforeEach(() => {
        control = new FormControl('');
        group = new FormGroup({
            field1: new FormControl(''),
            field2: new FormControl('')
        });
    });

    describe('comparison validator', () => {
        beforeEach(() => {
            invalidResult = { invalidComparison : true };
        });

        it('Should be equal', () => {
            group.controls['field1'].setValue('hi');
            group.controls['field2'].setValue('hi');
            let validator = FormValidators.comparisonValidator('field1', 'field2');
            expect(validator(group)).toBeNull();
        })

        it('Should be equal', () => {
            group.controls['field1'].setValue('I am not equal');
            group.controls['field2'].setValue('hi');
            let validator = FormValidators.comparisonValidator('field1', 'field2');
            expect(validator(group)).toEqual(invalidResult);
        })
    })

    describe('email validators', () => {
        beforeEach(() => {
            invalidResult = { invalidEmailAddress: true };
        })

        it('Should be valid', () => {
            control.setValue('iamemail@email.com')
            expect(FormValidators.emailValidator(control)).toBeNull();
        });

        it('Should be invalid', () => {
            control.setValue('i am not an email')
            expect(FormValidators.emailValidator(control)).toEqual(invalidResult);
        });
    });

})