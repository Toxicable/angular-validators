
[![npm version](https://badge.fury.io/js/angular-validators.svg)](https://badge.fury.io/js/angular-validators)
# angular-validators
More validators for Angular (2+)

##Installation
```
npm install --save angular-validators
```
###Validators
```
//imports
import { FormValidators } from 'angular-validators';
//usage
email: ['', FormValidators.required]
```
###Validation Messages
```
//imports
import { ValidationMessagesModule } from 'angular-validation';
//module imports
imports: [ ValidationMessagesModule.withConfig() ] //provides default config
//-or-
imports: [ ValidationMessagesModule.withConfig(myCustomValidationMessageMapperFn) ] //provides your own maper function
//please not that `myCustomValidationMessageMapperFn` must be of type `ValidationMessageMapperFn`
//usage
<av-validation-messages [control]="myForm.controls.password"></av-validation-messages>
//-or-
<av-validation-messages [group]="myForm"></av-validation-messages>
```

This package incldues all of Angulars inbuilt validators so you don't have to use them from two different places
Plus it adds some more helpful ones 

 Validator     | State     
-------------- | --------- 
Email          | Needs More Tests
Url            | Needs More Tests
Number         | Ready
Alpha          | Ready
Comparison     | Ready
Credit Card    | Ready

###@angular/forms Validators included
Validator | State 
--------------|-------
Required      | Ready
RequiredTrue  | Ready     
MinLength     | Ready     
MaxLength     | Ready     
Null          | Ready     
Compose       | Ready     
ComposeAsync  | Ready    

Feel free to suggest other validators to be included 
