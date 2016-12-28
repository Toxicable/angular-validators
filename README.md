# angular-validators
More validators for Angular (2+)


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
| Validators    | State     |
| ------------- | --------- |
| Required      | Ready     |
| RequiredTrue  | Ready     |
| MinLength     | Ready     |
| MaxLength     | Ready     |
| Null          | Ready     |
| Compose       | Ready     |
| ComposeAsync  | Ready     |
