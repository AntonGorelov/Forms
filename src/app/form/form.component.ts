import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  public cardForm: FormGroup;

  public emailRegex =
    '^[-a-z0-9!#$%&\'*+/=?^_`{|}~]+(?:\\.[-a-z0-9!#$%&\'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\\.)*(?:com|ru)$';
  public phoneRegex = '^(\\+7|7|8)?[\\s\\-]?\\(?[489][0-9]{2}\\)?[\\s\\-]?[0-9]{3}[\\s\\-]?[0-9]{2}[\\s\\-]?[0-9]{2}$';

  public isValid = false;

  constructor() {}

  public ngOnInit() {
    this.createNewForm();
  }

  public createNewForm() {
    this.cardForm = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName:  new FormControl('', Validators.required)
      }),
      email:    new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailRegex)]),
      phone:    new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)]),
      nickname: new FormControl('', [Validators.required, Validators.minLength(8)]),
      birthday: new FormControl('', Validators.required),
      sex:      new FormControl('', Validators.required),
      note:     new FormControl('', Validators.minLength(50))
    });
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
    if (this.emailControl.hasError('required')) { return 'You must enter a value'; }
    if (this.emailControl.hasError('email')) { return 'Not a valid email. Email must be contains @!'; }
    if (this.emailControl.hasError('pattern')) { return 'Not a valid email. Email must be contains .com or .ru domains!'; }
  }

  public getErrorMessagePhone() {
    return this.phoneControl.hasError('required') ? 'You must enter a value' :
      this.phoneControl.hasError('pattern') ? 'Not a valid phone. Input your russian number, please!' :
        '';
  }

  public getErrorMessageNickname() {
    return this.nicknameControl.hasError('required') ? 'You must enter a value' :
      this.nicknameControl.hasError('minLength') ? '' :
        'Not a valid nickname. Min length must be 8 symbols! ';
  }

  public onSubmit() {
    if (this.cardForm.valid) {
      console.log(this.cardForm.value);
      this.isValid = true;
    }
  }

  public clearForm() {
    this.cardForm.reset();
  }

  // Chips

}
