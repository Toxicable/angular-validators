import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessagesComponent } from './validation-messages.component';
import { defaultValidationMessageMapper, ValidationMessageMapperFn } from './validation-messages-map-fn';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValidationMessagesComponent
  ],
  exports: [
    ValidationMessagesComponent
  ],
})
export class ValidationMessagesBaseModule {
}

export class ValidationMessagesModule {
  static withConfig(messageMapperFn?: ValidationMessageMapperFn): ModuleWithProviders {
    return {
      ngModule: ValidationMessagesBaseModule,
      providers: [
        {
          provide: 'validationMessageMapper',
          useValue: messageMapperFn ? messageMapperFn : defaultValidationMessageMapper
        }
      ]
    };
  }
}
