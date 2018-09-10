import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatDialog, MatDialogRef } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';

import { FormService } from '../../services';
import { CardAnswerDialogComponent } from '../cardAnswerDialog';

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

  public hobbies = [];

  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  matcher = new ErrorStateMatcher();

  cardAnswerDialogRef: MatDialogRef<CardAnswerDialogComponent>;

  constructor(public formService: FormService, private _matDialog: MatDialog) {}

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

  get hobbyControl() {
    return this.cardForm.get('hobbyVal.hobbyFormControl');
  }

  get hobbyArray() {
    return this.cardForm.get('hobbyVal.hobbyFormArray');
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
    this.formService.onSubmit();
  }

  public clearForm() {
    return this.formService.clearForm();
  }

  // <--------------- Chips --------------->

  public temp(value) {
    return new FormControl(value, Validators.minLength(7));
  }

  public addHobby(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      (<FormArray>this.cardForm.get('hobbyVal')).value.hobbyArray.push(this.temp(event.value));
    }
    if (input) {
      input.value = '';
    }
  }

  public valuesHobby() {
    this.hobbies = [];

    for (let i = 0; i < this.cardForm.get('hobbyVal').value.hobbyArray.length; i++) {
      this.hobbies.push(this.cardForm.get('hobbyVal').value.hobbyArray[i].value);
    }
    this.formService.hobbies = this.hobbies;
  }

  public removeHobby(i: number) {
    (<FormArray>this.cardForm.get('hobbyVal')).value.hobbyArray.splice(i, 1);
    this.hobbies.splice(i, 1);
    this.formService.hobbies = this.hobbies;
  }

  // <--------------- Dialog --------------->

  public openCardAnswerDialog() {
    this.cardAnswerDialogRef = this._matDialog.open(CardAnswerDialogComponent, {
      width: '390px',
      data: {
        fName:    this.formService.cardForm.value.name.firstName,
        lName:    this.formService.cardForm.value.name.lastName,
        email:    this.formService.cardForm.value.email,
        phone:    this.formService.cardForm.value.phone,
        nickname: this.formService.cardForm.value.nickname,
        birthday: this.formService.cardForm.value.birthday,
        hobby:    this.formService.hobbies,
        sex:      this.formService.cardForm.value.sex,
        note:     this.formService.cardForm.value.note
      }
    });
  }
}
