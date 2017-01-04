
[![npm version](https://badge.fury.io/js/angular-validators.svg)](https://badge.fury.io/js/angular-validators)
![Join the chat at https://gitter.im/angular/angular](https://badges.gitter.im/Join%20Chat.svg)
# angular-validators
Form Validators and a component to display them
Feel free to ping on on the angular/angular gitter if you have any issues

##Installation
```
npm install --save angular-validators
```
###Validation Messages
A component to easily display validation messages
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
###Validators
```
//imports
import { FormValidators } from 'angular-validators';
//usage
email: ['', FormValidators.required]
```

This package incldues all of Angulars inbuilt validators so you don't have to use them from two different places

 Validators       
--------------
Email         
Url      
Number     
Alpha    
Credit Card(Visa, Master Card, American Express, Diners, Discover, JBC)

Cross Field Validator
------
Comparison 

@angular/form Validators
--------------
Required      
RequiredTrue  
MinLength      
MaxLength     
Null         
Compose      
ComposeAsync 

Feel free to suggest other validators to be included 
