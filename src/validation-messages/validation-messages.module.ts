import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessagesComponent } from './validation-messages.component';
import { defaultValidationMessageMapper, ValidationMessageMapperFn } from './validation-messages-map-fn';

@NgModule({
    imports: [ CommonModule, ],
    declarations: [ ValidationMessagesComponent ],
    exports: [ ValidationMessagesComponent ],
  })
export class ValidationMessagesBaseModule {
}

@NgModule({
  providers: [ { provide: 'validationMessageMapper', useValue: defaultValidationMessageMapper}],
  imports : [ ValidationMessagesBaseModule ],
  exports: [ ValidationMessagesComponent ]
})
export class ValidationMessagesModule {
  static withConfig(messageMapperFn: ValidationMessageMapperFn): ModuleWithProviders {
    if (!messageMapperFn){
      throw new Error('if you are using ValidationMessagesModule.withConfig(mapperFn) you must pass a custom mapper function, otheriwse use ValidationMessagesModule');
    }
    return {
      ngModule: ValidationMessagesBaseModule,
      providers: [ { provide: 'validationMessageMapper', useValue: messageMapperFn } ]
    };
  }
}
