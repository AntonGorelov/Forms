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
  public firstName: FormControl;
  public lastName: FormControl;
  public email: FormControl;
  public phone: FormControl;
  public nickname: FormControl;
  public birthday: FormControl;
  public sex: FormControl;
  public note: FormControl;

  public emailRegex =
    '^[-a-z0-9!#$%&\'*+/=?^_`{|}~]+(?:\\.[-a-z0-9!#$%&\'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\\.)*(?:com|ru)$';
  public phoneRegex = '^(\\+7|7|8)?[\\s\\-]?\\(?[489][0-9]{2}\\)?[\\s\\-]?[0-9]{3}[\\s\\-]?[0-9]{2}[\\s\\-]?[0-9]{2}$';

  public isValid = false;

  constructor() {}

  public ngOnInit() {
    this.createFormControls();
    this.createNewForm();
  }

  public createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailRegex)]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)]);
    this.nickname = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.birthday = new FormControl('', Validators.required);
    this.sex = new FormControl('', Validators.required);
    this.note = new FormControl('', Validators.minLength(50));
  }

  public createNewForm() {
    this.cardForm = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName
      }),
      email:    this.email,
      phone:    this.phone,
      nickname: this.nickname,
      birthday: this.birthday,
      sex:      this.sex,
      note:     this.note
    });
  }

  public getErrorMessageEmail() {
    if (this.email.hasError('required')) { return 'You must enter a value'; }
    if (this.email.hasError('email')) { return 'Not a valid email. Email must be contains @!'; }
    if (this.email.hasError('pattern')) { return 'Not a valid email. Email must be contains .com or .ru domains!'; }

    // return this.email.hasError('required') ? 'You must enter a value' :
    //   this.email.hasError('email') ? 'Not a valid email. Email must be contains @!' :
    //     '';
  }

  public getErrorMessagePhone() {
    return this.phone.hasError('required') ? 'You must enter a value' :
      this.phone.hasError('pattern') ? 'Not a valid phone. Input your russian number, please!' :
        '';
  }

  public getErrorMessageNickname() {
    return this.nickname.hasError('required') ? 'You must enter a value' :
      this.nickname.hasError('minLength') ? '' :
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
