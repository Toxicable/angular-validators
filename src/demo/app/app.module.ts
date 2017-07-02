import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ValidationMessagesModule } from 'ngx-validators';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    ValidationMessagesModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
