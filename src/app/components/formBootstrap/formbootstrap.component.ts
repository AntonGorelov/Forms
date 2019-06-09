import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';

import { FormService } from '../../services';
import { CardAnswerDialogBootstrapComponent } from '../cardAnswerDialogBootstrap';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-formbootstrap',
  templateUrl: './formbootstrap.component.html',
  styleUrls: ['./formbootstrap.component.css'],
  providers: [BsModalService]
})
export class FormBootstrapComponent implements OnInit {

  public isValid = false;

  public hobbies = this.formService.hobbies;

  public minLengthFlag = false;

  // Max date for limit date in datepicker
  public date = this.formService.date;

  public bsModalRef: BsModalRef;

  constructor(
      public formService: FormService,
      private _modalService: BsModalService
  ) {}

  public ngOnInit(): void {
    this.createNewForm();
  }

  public createNewForm(): void  {
    this.formService.createNewForm();
  }

  public get cardForm() {
    return this.formService.cardForm;
  }

  public get fNameControl() {
    return this.cardForm.get('name.firstName');
  }

  public get lNameControl() {
    return this.cardForm.get('name.lastName');
  }

  public get emailControl() {
    return this.cardForm.get('email');
  }

  public get phoneControl() {
    return this.cardForm.get('phone');
  }

  public get nicknameControl() {
    return this.cardForm.get('nickname');
  }

  public get birthdayControl() {
    return this.cardForm.get('birthday');
  }

  public get hobbyFormControl() {
    return this.cardForm.get('hobbyVal.hobbyFormControl');
  }

  public get sexControl() {
    return this.cardForm.get('sex');
  }

  public get noteControl() {
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

  public onSubmit(): void {
    if (this.cardForm.valid) {
      this.isValid = true;
    }
  }

  // <--------------- Chips --------------->

  public temp(value): FormControl {
    return new FormControl(value, Validators.minLength(7));
  }

  public addHobby(event): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      if (value.length > 7) {
        (<FormArray>this.cardForm.get('hobbyVal')).value.hobbyArray.push(this.temp(event.value));
      } else {
        this.minLengthFlag = true;
      }
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

  public removeHobby(event): void {
    (<FormArray>this.cardForm.get('hobbyVal')).value.hobbyArray.splice(event);
    const index = this.hobbies.indexOf(event);

    if (index !== -1) {
      this.hobbies.splice(index, 1);
    }

    this.formService.hobbies = this.hobbies;
  }

  // <--------------- Dialog --------------->

  public openCardAnswerDialog(): void {
    const initialState = {
      title: 'Card answer'
    };
    this.bsModalRef = this._modalService.show(CardAnswerDialogBootstrapComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
