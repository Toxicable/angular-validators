import { NgModule } from '@angular/core';
import { ValidationMessagesComponent } from './validation-messages.component';
import { ValidationMessagesService } from './validation-messages.service';

@NgModule({
  declarations: [
    ValidationMessagesComponent
  ],
  exports: [
    ValidationMessagesComponent
  ],
  providers: [
    ValidationMessagesService
  ]
})
export class ValidationMessagesModule {

}
