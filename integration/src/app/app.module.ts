import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ValidationMessagesModule } from 'ngx-validators';

import { AppComponent }  from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, ValidationMessagesModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
