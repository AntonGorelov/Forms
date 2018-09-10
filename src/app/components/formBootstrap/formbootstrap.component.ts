import { Component, OnInit } from '@angular/core';

import { FormService } from '../../services';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CardAnswerDialogBootstrapComponent } from '../cardAnswerDialogBootstrap';


@Component({
  selector: 'app-formbootstrap',
  templateUrl: './formbootstrap.component.html',
  styleUrls: ['./formbootstrap.component.css'],
  providers: [BsModalService]
})
export class FormBootstrapComponent implements OnInit {

  public isValid = false;

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

  // <--------------- Dialog --------------->

  public openCardAnswerDialog() {
    const initialState = {
      title: 'Card answer'
    };
    this.bsModalRef = this._modalService.show(CardAnswerDialogBootstrapComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
