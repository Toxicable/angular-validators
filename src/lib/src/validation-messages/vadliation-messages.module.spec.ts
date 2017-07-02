import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormValidators } from '../validators/form-validators';
import { ValidationMessageMapperFn } from './validation-messages-map';

import 'rxjs/add/operator/first';
import { ValidationMessagesComponent, ValidationMessagesModule, VALIDATION_MESSAGE_MAPPER_TOKEN } from './validation-messages';

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

    comp._control.markAsDirty();
    comp.errorMessages$.first().subscribe(msg => {
      expect(msg).toBe('Required');
    });
    fixture.detectChanges();

  }));

  it('should create module with custom config', async(() => {
    const mapper: ValidationMessageMapperFn = function (a: string, b: any): string {
      const config = {
        required: 'Field Required'
      };
      return config[a];
    };

    TestBed.configureTestingModule({
      imports: [ValidationMessagesModule],
      providers: [{ provide: VALIDATION_MESSAGE_MAPPER_TOKEN, useValue: mapper }]

    });
    fixture = TestBed.createComponent(ValidationMessagesComponent);
    comp = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('span')).nativeElement;

    comp.control = new FormControl('', FormValidators.required);

    comp._control.markAsDirty();
    comp.errorMessages$.first().subscribe(msg => {
      expect(msg).toBe('Field Required');
    });
    fixture.detectChanges();
  }));
});
