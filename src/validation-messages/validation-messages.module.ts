import { NgModule, ModuleWithProviders, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessagesComponent } from './validation-messages.component';
import { defaultValidationMessageMapper, ValidationMessageMapperFn } from './validation-messages-map-fn';

@NgModule({
  imports: [CommonModule,],
  declarations: [ValidationMessagesComponent],
  exports: [ValidationMessagesComponent],
})
export class ValidationMessagesModule {
}
