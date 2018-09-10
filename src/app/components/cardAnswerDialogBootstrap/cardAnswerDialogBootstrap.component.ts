import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormService } from '../../services';


@Component({
  selector: 'app-card-answer-dialog-bt',
  templateUrl: './cardAnswerDialogBootstrap.component.html',
  styleUrls: ['./cardAnswerDialogBootstrap.component.css']
})
export class CardAnswerDialogBootstrapComponent implements OnInit {

  public title: string;
  public closeBtnName: string;

  public fName;
  public lName;
  public email;
  public phone;
  public nickname;
  public birthday;
  public hobby;
  public sex;
  public note;

  constructor(public bsModalRef: BsModalRef, private _formService: FormService) {}

  ngOnInit() {
    this.fName = this._formService.cardForm.value.name.firstName;
    this.lName = this._formService.cardForm.value.name.lastName;
    this.email = this._formService.cardForm.value.email;
    this.phone = this._formService.cardForm.value.phone;
    this.nickname = this._formService.cardForm.value.nickname;
    this.birthday = this._formService.cardForm.value.birthday;
    this.hobby = this._formService.cardForm.value.hobby;
    this.sex = this._formService.cardForm.value.sex;
    this.note = this._formService.cardForm.value.note;
  }
}
