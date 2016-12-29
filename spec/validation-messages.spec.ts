import { Component } from '@angular/core';
import { FormControl } from '@angular/forms'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { ValidationMessagesComponent } from '../';
import { FormValidators } from '../';
import { defaultValidationMessagesMapper } from '../src/validation-messages/validation-messages-map-fn';

describe('App', () => {
  let comp: ValidationMessagesComponent;
  let fixture: ComponentFixture<ValidationMessagesComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationMessagesComponent], // declare the test component
      providers: [{ provide: 'validationMessageMapper', useValue: defaultValidationMessagesMapper}]
    });
    fixture = TestBed.createComponent(ValidationMessagesComponent);
    comp = fixture.componentInstance; // BannerComponent test instance
  });

  it('something', () => {
    let control = new FormControl('', FormValidators.required);
    comp.control = control;
    control.markAsTouched();
    //fixture.detectChanges;


    expect(comp.errorMessage).toEqual('Required');
  })

  it('something elsse', () =>{
    let control = new FormControl('', FormValidators.required);
    comp.control = control;
    control.markAsTouched();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('span'));
    el = de.nativeElement;
    expect(el.innerText).toEqual('Required')
  })
});
