
[![npm version](https://badge.fury.io/js/angular-validators.svg)](https://badge.fury.io/js/angular-validators)
# angular-validators
More validators for Angular (2+)

##Installation
```
npm install --save angular-validators
```
```
import { FormValidators } from 'angular-validators';
```

```
email: ['', FormValidators.required]
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
