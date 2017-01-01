import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ValidationMessagesComponent, ValidationMessagesModule, ValidationMessageMapperFn } from '../';
import { FormValidators } from '../';
import { defaultValidationMessageMapper } from '../src/validation-messages/validation-messages-map-fn';

import 'rxjs/add/operator/first';

describe('validation messages module', () => {
  let comp: ValidationMessagesComponent;
  let fixture: ComponentFixture<ValidationMessagesComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  it('should create module with default config', async(() => {
    TestBed.configureTestingModule({
      imports: [ValidationMessagesModule]
    });
    fixture = TestBed.createComponent(ValidationMessagesComponent);
    comp = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('span')).nativeElement;

    comp.control = new FormControl('', FormValidators.required);

    comp.ngOnInit();
    comp.control.markAsTouched();
    comp.errorMessages$.first().subscribe(msg => {
      expect(msg).toBe('Required');
    });
    fixture.detectChanges();
  }));

  it('should create module with custom config', () => {
    const mapper: ValidationMessageMapperFn = function (a: string, b: any): string {
      const config = {
        required: 'Field Required'
      };
      return config[a];
    };

    TestBed.configureTestingModule({
      imports: [ValidationMessagesModule.withConfig(mapper)]
    });
    fixture = TestBed.createComponent(ValidationMessagesComponent);
    comp = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('span')).nativeElement;

    comp.control = new FormControl('', FormValidators.required);

    comp.ngOnInit();
    comp.control.markAsTouched();
    comp.errorMessages$.first().subscribe(msg => {
      expect(msg).toBe('Field Required');
    });
    fixture.detectChanges();
  });

  it('should throw when no undefined is passed as mapper fn', () => {
    expect(() => ValidationMessagesModule.withConfig(undefined))
      .toThrowError('if you are using ValidationMessagesModule.withConfig(mapperFn) you must pass a custom mapper function, otheriwse use ValidationMessagesModule');
  });

  it('should throw when no null is passed as mapper fn', () => {
    expect(() => ValidationMessagesModule.withConfig(null))
      .toThrowError('if you are using ValidationMessagesModule.withConfig(mapperFn) you must pass a custom mapper function, otheriwse use ValidationMessagesModule');
  });

});