import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { StepperService } from '../../services';
import { UserModel } from '../../models';


@Component({
  selector: 'app-edit-user',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.css']
})
export class EditUserComponent implements OnInit {

  // Main FormGroup name
  public editForm: FormGroup;

  public name: FormGroup;

  // Set limit value for calendar
  public date = new Date();
  public maxDate = this._stepperService.maxDate;

  // Instance of UserModel
  public userInfo = this._stepperService.userInfo;

  public userList = this._stepperService.userList;

  constructor (
    private _stepperService: StepperService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (!this.userInfo) {
      alert('User information not load!');
      this._router.navigate(['stepper']);
    } else {
      this.editForm = this._formBuilder.group({
        name: new FormGroup({
          firstName: new FormControl(this.userInfo.name.firstName, [Validators.required]),
          lastName: new FormControl(this.userInfo.name.lastName, [Validators.required])
        }),
        nickname: new FormControl(this.userInfo.nickname, [Validators.required, Validators.minLength(8)]),
        birthday: new FormControl(this.userInfo.birthday, [Validators.required]),
        address:  this._formBuilder.array([this.userInfo.address], [Validators.required]),
        phone: new FormControl(this.userInfo.phone, [Validators.required]),
        email: new FormControl(this.userInfo.email, [Validators.required]),
        socNetworks: new FormControl(this.userInfo.socNetworks, [Validators.required]),
        password: new FormControl(this.userInfo.password, [Validators.required, Validators.minLength(5)]),
        confirmPassword: new FormControl(this.userInfo.confirmPassword, [Validators.required])
      });
    }
  }

  public updateUser() {
    this._stepperService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this._router.navigate(['stepper']);
        },
        (error) => {
          alert(error);
        }
      );
  }

  public deleteUser(user: UserModel) {
    this._stepperService.deleteUser(user.id)
      .subscribe(
        () => {
          this.userList.filter((u) => u !== user);
          this._router.navigate(['stepper']);
        }
      );
  }
}
