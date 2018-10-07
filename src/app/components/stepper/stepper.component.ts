import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { StepperService } from '../../services';
import { Router } from '@angular/router';


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
  public users: any;

  // Columns in result table
  public displayedColumns: string[] =
    ['First Name', 'Last Name', 'Nickname', 'Birthday', 'Address', 'Phone', 'Email', 'Social Net', 'Action'];

  // Flag for view table on the page
  public isQuerySuccess = this._stepperService.isQuerySuccess;

  constructor(
    private _stepperService: StepperService,
    public snackBar: MatSnackBar, private _router: Router
  ) {}

  // <--------------- Get values --------------->

  get fNameControl() {
    return this._stepperService.fNameControl;
  }

  get lNameControl() {
    return this._stepperService.lNameControl;
  }

  get nicknameControl() {
    return this._stepperService.nicknameControl;
  }

  get birthdayControl() {
    return this._stepperService.birthdayControl;
  }

  // Max date for limit date in datepicker
  get dateControl() {
    return this._stepperService.date;
  }

  get addressControl() {
    return this._stepperService.addressControl;
  }

  get phoneControl() {
    return this._stepperService.phoneControl;
  }

  get emailControl() {
    return this._stepperService.phoneControl;
  }

  get typeSocNetworksControl() {
    return this._stepperService.typeSocNetworksControl;
  }

  get socNetworksControl() {
    return this._stepperService.socNetworksControl;
  }

  get passwordControl() {
    return this._stepperService.passwordControl;
  }

  get confirmPasswordControl() {
    return this._stepperService.confirmPasswordControl;
  }

  ngOnInit() {
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

  getErrorMessageNickname() {
    return this._stepperService.getErrorMessageNickname();
  }

  getErrorMessagePhone() {
    return this._stepperService.getErrorMessagePhone();
  }

  getErrorMessageEmail() {
    return this._stepperService.getErrorMessageEmail();
  }

  getErrorMessageSocialNetworks() {
    return this._stepperService.getErrorMessageSocialNetworks();
  }

  getErrorMessagePassword() {
    return this._stepperService.getErorMessagePassword();
  }

  getErrorMessageConfirmPassword() {
    return this._stepperService.getErrorMessageConfirmPassword();
  }

  public addAddress() {
    this._stepperService.addAddress();
  }

  public removeAddress(i: number) {
    this._stepperService.removeAddress(i);
  }

  public selectValue(event) {
    this.selectedValue = event.value;
    this.thirdFormGroup.controls.socNetworks.enable();
    this._stepperService.selectedValue = this.selectedValue;
  }

  public onSubmit() {
    this._stepperService.onSubmit();
  }

  // <--------------- Http queries --------------->

  public getValues() {
    // take(1) = use only one subscription
    this._stepperService.getValues().pipe(take(1)).subscribe(
      (userList) => {
        this.users = userList;
      }
    );
  }

  public putValues() {
    this._stepperService.putValues().subscribe(() => {
      this.getValues();
    });
  }

  public resetForm(stepper) {
    this._stepperService.resetForm(stepper);
  }

  // <--------------- UI --------------->

  public openSnackBar() {
    this.isQuerySuccess.subscribe(
      this.snackBar.open('User ' + this.fNameControl.value + ' successfully added!', 'OK!', {
        duration: 1700
      })
    );
    // this.snackBar.open('User was not added', ':(', {
    //   duration: 1700
    // });
  }

  public userInfClick(user) {
    console.log('user', user);
    this._router.navigate(['stepper/' + user.id + '/edit']);
    this._stepperService.userInfo = user;
  }

}
