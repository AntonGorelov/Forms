import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatDialog, MatDialogRef } from '@angular/material';

import { FormService } from '../../services';
import { CardAnswerDialogComponent } from '../cardAnswerDialog';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  public hobbies = [];

  // Max date for limit date in datepicker
  public date = this.formService.date;

  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public matcher = new ErrorStateMatcher();

  public cardAnswerDialogRef: MatDialogRef<CardAnswerDialogComponent>;

  constructor(public formService: FormService, private _matDialog: MatDialog) {}

  public ngOnInit(): void {
    this.createNewForm();
  }

  public createNewForm(): void {
    this.formService.createNewForm();
  }

  public get cardForm(): FormGroup {
    return this.formService.cardForm;
  }

  public get fNameControl(): AbstractControl {
    return this.cardForm.get('name.firstName');
  }

  public get lNameControl(): AbstractControl {
    return this.cardForm.get('name.lastName');
  }

  public get emailControl(): AbstractControl {
    return this.cardForm.get('email');
  }

  public get phoneControl(): AbstractControl {
    return this.cardForm.get('phone');
  }

  public get nicknameControl(): AbstractControl {
    return this.cardForm.get('nickname');
  }

  public get birthdayControl(): AbstractControl {
    return this.cardForm.get('birthday');
  }

  public get hobbyControl(): AbstractControl {
    return this.cardForm.get('hobbyVal.hobbyFormControl');
  }

  public get hobbyArray(): AbstractControl {
    return this.cardForm.get('hobbyVal.hobbyFormArray');
  }

  public get sexControl(): AbstractControl {
    return this.cardForm.get('sex');
  }

  public get noteControl(): AbstractControl {
    return this.cardForm.get('note');
  }

  public getErrorMessageEmail(): string {
    return this.formService.getErrorMessageEmail();
  }

  public getErrorMessagePhone(): string {
    return this.formService.getErrorMessagePhone();
  }

  public getErrorMessageNickname(): string {
    return this.formService.getErrorMessageNickname();
  }

  public onSubmit(): void {
    this.formService.onSubmit();
  }

  public clearForm(): void {
    return this.formService.clearForm();
  }

  // <--------------- Chips --------------->

  public temp(value): FormControl {
    return new FormControl(value, Validators.minLength(7));
  }

  public addHobby(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      (<FormArray>this.cardForm.get('hobbyVal')).value.hobbyArray.push(this.temp(event.value));
    }
    if (input) {
      input.value = '';
    }
  }

  public valuesHobby(): void {
    this.hobbies = [];

    for (let i = 0; i < this.cardForm.get('hobbyVal').value.hobbyArray.length; i++) {
      this.hobbies.push(this.cardForm.get('hobbyVal').value.hobbyArray[i].value);
    }
    this.formService.hobbies = this.hobbies;
  }

  public removeHobby(i: number): void {
    (<FormArray>this.cardForm.get('hobbyVal')).value.hobbyArray.splice(i, 1);
    this.hobbies.splice(i, 1);
    this.formService.hobbies = this.hobbies;
  }

  // <--------------- Dialog --------------->

  public openCardAnswerDialog(): void {
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
