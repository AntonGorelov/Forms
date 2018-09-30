import {EventEmitter, Injectable, Output, ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatStepper } from '@angular/material';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { UserModel } from '../models';


@Injectable()
export class StepperService {

  constructor(private _formBuilder: FormBuilder,
              private _http: HttpClient) {}

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  public fourthFormGroup: FormGroup;

  public date = new Date();
  public maxDate = this.date.setDate(this.date.getDate() - 1);

  public emailRegex =
    '^[-a-z0-9!#$%&\'*+/=?^_`{|}~]+(?:\\.[-a-z0-9!#$%&\'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\\.)*(?:com|ru)$';
  public phoneRegex = '^(\\+7|7|8)?[\\s\\-]?\\(?[489][0-9]{2}\\)?[\\s\\-]?[0-9]{3}[\\s\\-]?[0-9]{2}[\\s\\-]?[0-9]{2}$';

  // Social network select value
  public selectedValue = '';

  // Id in database for upload data
  public id = 3;

  // Flag, is showing the success of sending data
  public isQuerySuccess = new EventEmitter<boolean>();

  public userList: UserModel[];

  @ViewChild('stepper')
  public stepper;

  public createStepper() {
    this.firstFormGroup = this._formBuilder.group({
      name: new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName:  new FormControl('', [Validators.required])
      }),
      nickname: new FormControl('', [Validators.required, Validators.minLength(8)]),
      birthday: new FormControl('', [Validators.required]),
    });
    this.secondFormGroup = this._formBuilder.group({
      address: this._formBuilder.array([this._formBuilder.control('')], [Validators.required])
    });
    this.thirdFormGroup = this._formBuilder.group({
      phone: new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailRegex)]),
      typeSocNetworks: this._formBuilder.array([''], [Validators.required]),
      socNetworks: new FormControl({value: '', disabled: true},
        [Validators.required, this.socialNetValidator.bind(this)]),
    });
    this.fourthFormGroup = this._formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validator: this.confirmValidator.bind(this)});
  }

  public onSubmit() {
    if (this._formBuilder.group(this.firstFormGroup).valid && this._formBuilder.group(this.secondFormGroup).valid &&
      this._formBuilder.group(this.thirdFormGroup).valid && this._formBuilder.group(this.fourthFormGroup).valid) {
      console.log('StepperService data: ',
        this.firstFormGroup.value,
        this.secondFormGroup.value,
        this.thirdFormGroup.value,
        this.fourthFormGroup.value);
    }
  }

  // <--------------- Validators --------------->

  public socialNetValidator(control: FormControl): {[key: string]: any} {
    const value = control.value;
    const vkPattern = new RegExp('/^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[vk.com-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}/');
    const fbPattern = new RegExp('^.*(?:facebook\\.com/|fb\\.me/).*$');
    const ghPattern = new RegExp('^.*(?:github\\.com/).*$');

    if (!this.selectedValue) {
      return null;
    } else {
      if (this.selectedValue === 'Facebook') {
        return (fbPattern.test(value)) ? null : {'facebook': 'fb is not valid'};
      }
      if (this.selectedValue === 'GitHub') {
        return (ghPattern.test(value)) ? null : {'github': 'gh is not valid'};
      }
    }
  }

  public confirmValidator(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;

    if (confirmPassword !== null) {
      if (confirmPassword.length <= 0) {
        return;
      }
    }

    if (confirmPassword !== password) {
      AC.get('confirmPassword').setErrors( {confirmValidator: true} );
    } else {
      return;
    }

    return null;
  }

  // <--------------- Get values --------------->

  get fNameControl() {
    return this.firstFormGroup.get('name.firstName');
  }

  get lNameControl() {
    return this.firstFormGroup.get('name.lastName');
  }

  get nicknameControl() {
    return this.firstFormGroup.get('nickname');
  }

  get birthdayControl() {
    return this.firstFormGroup.get('birthday');
  }

  get addressControl() {
    return this.secondFormGroup.get('address') as FormArray;
  }

  get phoneControl() {
    return this.thirdFormGroup.get('phone');
  }

  get emailControl() {
    return this.thirdFormGroup.get('email');
  }

  get typeSocNetworksControl() {
    return this.thirdFormGroup.get('typeSocNetworks');
  }

  get socNetworksControl() {
    return this.thirdFormGroup.get('socNetworks');
  }

  get passwordControl() {
    return this.fourthFormGroup.get('password');
  }

  get confirmPasswordControl() {
    return this.fourthFormGroup.get('confirmPassword');
  }

  // <--------------- Error Handlers --------------->

  public getErrorMessageEmail() {
    if (this.emailControl.hasError('required')) { return 'You must enter a value'; }
    if (this.emailControl.hasError('email')) { return 'Not a valid email. Email must be contains @!'; }
    if (this.emailControl.hasError('pattern')) { return 'Not a valid email. Email must be contains .com or .ru domains!'; }
  }

  public getErrorMessagePhone() {
    return this.phoneControl.hasError('required') ? 'You must enter a value' :
      this.phoneControl.hasError('pattern') ? 'Not a valid phone. Input your russian number, please!' :
        '';
  }

  public getErrorMessageNickname() {
    return this.nicknameControl.hasError('required') ? 'You must enter a value' :
      this.nicknameControl.hasError('minLength') ? '' :
        'Not a valid nickname. Min length must be 8 symbols! ';
  }

  public getErrorMessageSocialNetworks() {
    return this.socNetworksControl.hasError('facebook') ? 'Not a valid facebook network!' :
      this.socNetworksControl.hasError('socialNetValidator') ? '' :
        'Not a valid github network!';
  }

  public getErorMessagePassword() {
    return this.passwordControl.hasError('required') ? 'You must enter a value' :
      this.passwordControl.hasError('minLength') ? '' :
        'Not a valid password. Min length must be 5 symbols! ';
  }

  public getErrorMessageConfirmPassword() {
    return this.confirmPasswordControl.hasError('required') ? 'You must enter a value' :
      this.confirmPasswordControl.hasError('confirmValidator') ? 'Passwords dont match! You must enter same passwords!' :
      '';
  }

  // <--------------- Add, Remove --------------->

  public addAddress() {
    this.addressControl.push(this._formBuilder.control(''));
  }

  public removeAddress(i: number) {
    const control = <FormArray>this.secondFormGroup.controls['address'];
    control.removeAt(i);
  }

  // <--------------- Http queries --------------->

  // Сonverting raw data into a model
  public getValues(): Observable<UserModel[]> {
    return this._http.get<UserModel[]>('http://localhost:3000/users')
      .pipe(
        map((response: any[]) => {
          return response.map((el) => new UserModel(el));
        }),
        tap({
          next: (userList: UserModel[]) => {
            this.userList = userList.slice();
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {}
        })
      );
  }

  public putValues() {
    // TODO: if form valid => http.post

    // const body = Object.assign({}, {id: this.id}, this.firstFormGroup.getRawValue())

    return this._http
      .post('http://localhost:3000/users/', {
        id: this.id,
        name: {
          firstName: this.fNameControl.value,
          lastName: this.lNameControl.value
        },
        nickname: this.nicknameControl.value,
        birthday: this.birthdayControl.value,
        address: this.addressControl.value,
        phone: this.phoneControl.value,
        email: this.emailControl.value,
        socNetworks: this.socNetworksControl.value,
        password: this.passwordControl.value,
        confirmPassword: this.confirmPasswordControl.value
      })
      .pipe(
        tap((data) => {
          this.id += 1;
          console.log('POST request is successfull', data);
          this.isQuerySuccess.emit();
        }, (error) => {
          console.log('Query is not success! Error: ', error);
        })
      );
  }

  public resetForm(stepper: MatStepper) {
    this.isQuerySuccess.subscribe(
      stepper.reset()
    );
  }

}
