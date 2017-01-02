import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ValidationMessagesComponent, ValidationMessagesModule } from '../';
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
      declarations: [ValidationMessagesComponent],
      providers: [{ provide: 'validationMessageMapper', useValue: defaultValidationMessageMapper }]
    });
    fixture = TestBed.createComponent(ValidationMessagesComponent);
    comp = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('span')).nativeElement;
  });

  it('should display an error message for a control', async(() => {
    comp.control = new FormControl('', FormValidators.required);

    comp.ngOnInit();
    comp.control.markAsTouched();
    comp.errorMessages$.first().subscribe(msg => {
      expect(msg).not.toBeNull();
    });
    fixture.detectChanges();

  }));

  it('should display an error message for a group', async(() => {
    comp.group = new FormGroup({
      password: new FormControl('a'),
      confirmPassword: new FormControl('')
    },
      FormValidators.comparison('password', 'confirmPassword')
    );

    comp.ngOnInit();
    comp.group.markAsTouched();
    comp.errorMessages$.first().subscribe(msg => {
      expect(msg).not.toBeNull();
    });
    fixture.detectChanges();
  }));

  it('should not display an error if it has not been touched', async(() => {
    comp.control = new FormControl('', FormValidators.required);

    comp.ngOnInit();
    comp.errorMessages$.first().subscribe(msg => {
      expect(msg).toBeNull();
    });
    fixture.detectChanges();

  }));
});
