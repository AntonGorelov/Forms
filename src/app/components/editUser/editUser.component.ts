import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import {first, takeUntil} from 'rxjs/operators';

import { StepperService } from '../../services';
import { UserModel } from '../../models';


@Component({
  selector: 'app-edit-user',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  // Main FormGroup name
  public editForm: FormGroup;

  public name: FormGroup;

  // Set limit value for calendar
  public date = new Date();
  public maxDate = this._stepperService.maxDate;

  // Instance of UserModel
  public userInfo = this._stepperService.userInfo;

  public userList = this._stepperService.userList;

  private _destroy$ = new Subject<void>();

  constructor (
    private _stepperService: StepperService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
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

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public updateUser(): void {
    this._stepperService.updateUser(this.editForm.value)
      .pipe(
          first(),
          takeUntil(this._destroy$),
      )
      .subscribe(
        () => {
          this._router.navigate(['stepper']);
        },
        (error) => {
          alert(error);
        }
      );
  }

  public deleteUser(user: UserModel): void {
    this._stepperService.deleteUser(user.id)
        .pipe(
            takeUntil(this._destroy$),
        )
        .subscribe(
        () => {
          this.userList.filter((u) => u !== user);
          this._router.navigate(['stepper']);
        }
      );
  }

  // <--------------- Get values --------------->

  public get fNameControl(): AbstractControl {
    return this.editForm.get('name.firstName');
  }

  public get lNameControl(): AbstractControl {
    return this.editForm.get('name.lastName');
  }

  public get nicknameControl(): AbstractControl {
    return this.editForm.get('nickname');
  }

  public get birthdayControl(): AbstractControl {
    return this.editForm.get('birthday');
  }

  public get addressControl(): AbstractControl {
    return this.editForm.get('address');
  }

  public get phoneControl(): AbstractControl {
    return this.editForm.get('phone');
  }

  public get emailControl(): AbstractControl {
    return this.editForm.get('email');
  }

  public get socNetworksControl(): AbstractControl {
    return this.editForm.get('socNetworks');
  }

  public get passwordControl(): AbstractControl {
    return this.editForm.get('password');
  }

  public get confirmPasswordControl(): AbstractControl {
    return this.editForm.get('confirmPassword');
  }
}
