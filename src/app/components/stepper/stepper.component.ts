import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StepperService } from '../../services';
import { Address } from '../../models';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  public fourthFormGroup: FormGroup;

  // Max date for limit date in datepicker
  public date = this._stepperService.date;

  // Array with Address values: country, city, street and number of house
  public address: Address[];

  @ViewChild('search')
  public searchElementRef: ElementRef;

  // Search element value
  public searchValue;

  // Select of social network. Need for add image
  public selected: 'none';

  // Social networks
  public networks = [
    { value: 'GitHub',   logo: 'http://www.macdrifter.com/theme/images/octocat-black.svg'},
    { value: 'Facebook', logo: 'https://assets-cdn.github.com/images/modules/site/logos/facebook-logo.png'}
  ];

  // Activate field after change social network
  public disableSelect = true;

  public selectedValue = '';

  constructor(private _stepperService: StepperService) {}

  ngOnInit() {
    this._stepperService.createStepper();
    this.firstFormGroup = this._stepperService.firstFormGroup;
    this.secondFormGroup = this._stepperService.secondFormGroup;
    this.thirdFormGroup = this._stepperService.thirdFormGroup;
    this.fourthFormGroup = this._stepperService.fourthFormGroup;

    this.thirdFormGroup.get('socNetworks').valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      console.log(value);
    });

    this.getValues();
  }

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
    // this.searchValue = this.searchElementRef.nativeElement.value;
    // console.log('search value: ', this.searchValue);
    // this._stepperService.searchElementRef = this.searchElementRef;
    this._stepperService.addAddress();
  }

  public removeAddress(i: number) {
    this._stepperService.removeAddress(i);
  }

  public selectValue(event) {
    this.selectedValue = event.value;
    // console.log('selectedvalue', this.selectedValue);
    // console.log('disabled', this.thirdFormGroup.get('socNetworks').disabled);
    this.thirdFormGroup.controls.socNetworks.enable();
    this._stepperService.selectedValue = this.selectedValue;
    // debugger;
    // this.thirdFormGroup.get('typeSocNetworks').valueChanges.
    // subscribe(selectedValue => {
    //   if (selectedValue === 'GitHub') {
    //     this.thirdFormGroup.get('socNetworks').reset();
    //     this.thirdFormGroup.controls.socNetworks.enable();
    //     console.log('disabled', this.thirdFormGroup.get('socNetworks').disabled);
    //   }
    // });
    // this._stepperService.selectedValue = this.selectedValue;

    // this._stepperService.socialNetValidator();
    console.log('value', this.selectedValue);
  }

  public onSubmit() {
    this._stepperService.onSubmit();
  }

  // <--------------- Http queries --------------->

  public getValues() {
    this._stepperService.getValues();
  }

  public putValues() {
    this._stepperService.putValues();
  }

}
