import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormValidators } from './../validators/form-validators';
import { defaultValidationMessageMapper } from './validation-messages-map';
import { ValidationMessagesComponent } from './validation-messages';

import 'rxjs/add/operator/first';

describe('validation messages component', () => {
  let comp: ValidationMessagesComponent;
  let fixture: ComponentFixture<ValidationMessagesComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationMessagesComponent],
      providers: [{ provide: 'validationMessageMapper', useValue: defaultValidationMessageMapper }]
    });
    fixture = TestBed.createComponent(ValidationMessagesComponent);
    comp = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('span')).nativeElement;
  });

  it('should display an error message for a control', async(() => {
    comp.control = new FormControl('', FormValidators.required);

    comp._control.markAsDirty();
    comp.errorMessages$.first().subscribe(msg => {
      expect(msg).not.toBeNull();
    });
    fixture.detectChanges();

  }));

  it('should not display an error if it has not been touched', async(() => {
    comp.control = new FormControl('', FormValidators.required);

    comp.errorMessages$.first().subscribe(msg => {
      expect(msg).toBeNull();
    });
    fixture.detectChanges();

  }));
});
