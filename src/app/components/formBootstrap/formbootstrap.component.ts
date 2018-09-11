import { Component, OnInit } from '@angular/core';

import { FormService } from '../../services';
import { CardAnswerDialogBootstrapComponent } from '../cardAnswerDialogBootstrap';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormArray, FormControl, Validators } from '@angular/forms';


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

  bsModalRef: BsModalRef;

  constructor(public formService: FormService, private _modalService: BsModalService) {}

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

  get hobbyFormControl() {
    return this.cardForm.get('hobbyVal.hobbyFormControl');
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
    if (this.cardForm.valid) {
      this.isValid = true;
    }
  }

  // <--------------- Chips --------------->

  public temp(value) {
    return new FormControl(value, Validators.minLength(7));
  }

  public addHobby(event) {
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

  public valuesHobby() {
    this.hobbies = [];

    for (let i = 0; i < this.cardForm.get('hobbyVal').value.hobbyArray.length; i++) {
      this.hobbies.push(this.cardForm.get('hobbyVal').value.hobbyArray[i].value);
    }
    this.formService.hobbies = this.hobbies;
  }

  public removeHobby(event) {
    (<FormArray>this.cardForm.get('hobbyVal')).value.hobbyArray.splice(event);
    const index = this.hobbies.indexOf(event);

    if (index !== -1) {
      this.hobbies.splice(index, 1);
    }

    this.formService.hobbies = this.hobbies;
  }

  // <--------------- Dialog --------------->

  public openCardAnswerDialog() {
    console.log(this.cardForm.controls.hobbyVal.value.hobbyFormControl);
    const initialState = {
      title: 'Card answer'
    };
    this.bsModalRef = this._modalService.show(CardAnswerDialogBootstrapComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
