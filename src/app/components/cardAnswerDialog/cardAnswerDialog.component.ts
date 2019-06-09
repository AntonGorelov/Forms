import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-card-answer-dialog',
  templateUrl: './cardAnswerDialog.component.html',
  styleUrls: ['./cardAnswerDialog.component.css']
})
export class CardAnswerDialogComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<CardAnswerDialogComponent>,
      @Inject(MAT_DIALOG_DATA)
      private _data
  ) {}

  public fName;
  public lName;
  public email;
  public phone;
  public nickname;
  public birthday;
  public hobby;
  public sex;
  public note;


  public ngOnInit(): void {
    this.fName = this._data.fName;
    this.lName = this._data.lName;
    this.email = this._data.email;
    this.phone = this._data.phone;
    this.nickname = this._data.nickname;
    this.birthday = this._data.birthday;
    this.hobby = this._data.hobby;
    this.sex = this._data.sex;
    this.note = this._data.note;
  }
}
