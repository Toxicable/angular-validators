import { Component } from '@angular/core';
import { FormControl } from '@angular/forms'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { ValidationMessagesComponent } from '../';
import { FormValidators } from '../';
import { defaultValidationMessageMapper } from '../src/validation-messages/validation-messages-map-fn';


import 'rxjs/add/operator/first';

describe('validation messages component', () => {
  let comp: ValidationMessagesComponent;
  let fixture: ComponentFixture<ValidationMessagesComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationMessagesComponent ],
      providers: [{ provide: 'validationMessageMapper', useValue: defaultValidationMessageMapper}]
    });
    fixture = TestBed.createComponent(ValidationMessagesComponent);
    comp = fixture.componentInstance;
  });

  it('something elsse', () => {
    el = fixture.debugElement.query(By.css('span')).nativeElement;
    comp.control = new FormControl('', FormValidators.required);

    comp.ngOnInit();
    comp.control.markAsTouched();

    comp.errorMessages$.first().subscribe(msg => {
      expect(msg).toEqual('Required');
    });

    comp.control.setValue('');

    comp.errorMessages$.first().subscribe(msg => {
      expect(msg).toBeNull();
    });
  });
});
