import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { StepperService } from '../../services';
import {UserModel} from '../../models';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  public fourthFormGroup: FormGroup;

  // Array with Address values: country, city, street and number of house
  public address = [];

  // Select of social network. Need for add image
  public selected: 'none';

  // Social networks
  public networks = [
    { value: 'GitHub',   logo: 'https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-128.png'},
    { value: 'Facebook', logo: 'https://cdn4.iconfinder.com/data/icons/bettericons/354/facebook-circle-128.png'}
  ];

  public selectedValue = '';

  // List of users in database
  public users: UserModel[];

  // Columns in result table
  public displayedColumns: string[] =
    ['First Name', 'Last Name', 'Nickname', 'Birthday', 'Address', 'Phone', 'Email', 'Social Net', 'Action'];

  // Flag for view table on the page
  public isQuerySuccess = this._stepperService.isQuerySuccess;

  constructor(
    private _stepperService: StepperService,
    public snackBar: MatSnackBar,
    private _router: Router
  ) {}

  // <--------------- Get values --------------->

  public get fNameControl() {
    return this._stepperService.fNameControl;
  }

  public get lNameControl() {
    return this._stepperService.lNameControl;
  }

  public get nicknameControl() {
    return this._stepperService.nicknameControl;
  }

  public get birthdayControl() {
    return this._stepperService.birthdayControl;
  }

  // Max date for limit date in datepicker
  public get dateControl() {
    return this._stepperService.date;
  }

  public get addressControl() {
    return this._stepperService.addressControl;
  }

  public get phoneControl() {
    return this._stepperService.phoneControl;
  }

  public get emailControl() {
    return this._stepperService.emailControl;
  }

  public get typeSocNetworksControl() {
    return this._stepperService.typeSocNetworksControl;
  }

  public get socNetworksControl() {
    return this._stepperService.socNetworksControl;
  }

  public get passwordControl() {
    return this._stepperService.passwordControl;
  }

  public get confirmPasswordControl() {
    return this._stepperService.confirmPasswordControl;
  }

  public ngOnInit(): void {
    this._stepperService.createStepper();
    this.firstFormGroup = this._stepperService.firstFormGroup;
    this.secondFormGroup = this._stepperService.secondFormGroup;
    this.thirdFormGroup = this._stepperService.thirdFormGroup;
    this.fourthFormGroup = this._stepperService.fourthFormGroup;

    this.thirdFormGroup.get('socNetworks').valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      console.log('socNetwork value', value);
    });

    // this.getValues();
  }

  // <--------------- Error Handlers --------------->

  public getErrorMessageNickname(): string {
    return this._stepperService.getErrorMessageNickname();
  }

  public getErrorMessagePhone(): string {
    return this._stepperService.getErrorMessagePhone();
  }

  public getErrorMessageEmail(): string {
    return this._stepperService.getErrorMessageEmail();
  }

  public getErrorMessageSocialNetworks(): string {
    return this._stepperService.getErrorMessageSocialNetworks();
  }

  public getErrorMessagePassword(): string {
    return this._stepperService.getErorMessagePassword();
  }

  public getErrorMessageConfirmPassword(): string {
    return this._stepperService.getErrorMessageConfirmPassword();
  }

  public addAddress(): void {
    this._stepperService.addAddress();
  }

  public removeAddress(i: number): void {
    this._stepperService.removeAddress(i);
  }

  public selectValue(event): void {
    this.selectedValue = event.value;
    this.thirdFormGroup.controls.socNetworks.enable();
    this._stepperService.selectedValue = this.selectedValue;
  }

  public onSubmit(): void {
    this._stepperService.onSubmit();
  }

  // <--------------- Http queries --------------->

  public getValues(): void {
    // take(1) = use only one subscription
    this._stepperService.getValues().pipe(take(1)).subscribe(
      (userList) => {
        this.users = userList;
      }
    );
  }

  public putValues(): void {
    this._stepperService.putValues().subscribe(() => {
      this.getValues();
    });
  }

  public resetForm(stepper): void {
    this._stepperService.resetForm(stepper);
  }

  // <--------------- UI --------------->

  public openSnackBar(): void {
    this.isQuerySuccess.subscribe(
      this.snackBar.open('User ' + this.fNameControl.value + ' successfully added!', 'OK!', {
        duration: 1700
      })
    );
  }

  public userInfClick(user): void {
    this._router.navigate(['stepper/' + user.id + '/edit']);
    this._stepperService.userInfo = user;
  }

}
