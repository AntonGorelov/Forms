import { Component, OnInit } from '@angular/core';

import { FormService } from '../form.service';


@Component({
  selector: 'app-formbootstrap',
  templateUrl: './formBootstrap.component.html',
  styleUrls: ['./formBootstrap.component.css']
})
export class FormBootstrapComponent implements OnInit {

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
    console.log(this.cardForm.value);
    if (this.cardForm.valid) {
      console.log(this.cardForm.value);
      this.isValid = true;
    }
  }
}
