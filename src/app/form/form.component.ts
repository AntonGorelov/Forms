import { Component, OnInit } from '@angular/core';

import { FormService } from '../form.service';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})

export class FormComponent implements OnInit {

  public isValid = false;

  constructor(public formService: FormService) {}

  public ngOnInit() {
    this.createNewForm();
  }

  public createNewForm() {
    this.formService.createNewForm();
  }

  get cardForm() {
    return this.formService.cardForm;
  }

  get fNameControl() {
    return this.cardForm.get('name.firstName');
  }

  get lNameControl() {
    return this.cardForm.get('name.lastName');
  }

  get emailControl() {
    return this.cardForm.get('email');
  }

  get phoneControl() {
    return this.cardForm.get('phone');
  }

  get nicknameControl() {
    return this.cardForm.get('nickname');
  }

  get birthdayControl() {
    return this.cardForm.get('birthday');
  }

  get sexControl() {
    return this.cardForm.get('sex');
  }

  get noteControl() {
    return this.cardForm.get('note');
  }

  public getErrorMessageEmail() {
    return this.formService.getErrorMessageEmail();
  }

  public getErrorMessagePhone() {
    return this.formService.getErrorMessagePhone();
  }

  public getErrorMessageNickname() {
    return this.formService.getErrorMessageNickname();
  }

  public onSubmit() {
    return this.formService.onSubmit();
  }

  public clearForm() {
    return this.formService.clearForm();
  }

  // Chips

}
