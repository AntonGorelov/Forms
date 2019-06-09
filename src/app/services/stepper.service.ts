// ANGULAR
import { EventEmitter, Injectable, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatStepper } from '@angular/material';

// RXJS
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { UserModel } from '../models';


@Injectable()
export class StepperService {

  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient
  ) {}

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
  public id = 6;

  // Flag, is showing the success of sending data
  public isQuerySuccess = new EventEmitter<boolean>();

  public userList: UserModel[];

  public userInfo: UserModel;

  @ViewChild('stepper')
  public stepper;

  public createStepper(): void {
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

  public onSubmit(): void {}

  // <--------------- Validators --------------->

  public socialNetValidator(control: FormControl): {[key: string]: any} {
    const value = control.value;
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

  public confirmValidator(AC: AbstractControl): void {
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

  public get fNameControl(): AbstractControl {
    return this.firstFormGroup.get('name.firstName');
  }

  public get lNameControl(): AbstractControl {
    return this.firstFormGroup.get('name.lastName');
  }

  public get nicknameControl(): AbstractControl {
    return this.firstFormGroup.get('nickname');
  }

  public get birthdayControl(): AbstractControl {
    return this.firstFormGroup.get('birthday');
  }

  public get addressControl(): FormArray {
    return <FormArray>this.secondFormGroup.get('address');
  }

  public get phoneControl(): AbstractControl {
    return this.thirdFormGroup.get('phone');
  }

  public get emailControl(): AbstractControl {
    return this.thirdFormGroup.get('email');
  }

  public get typeSocNetworksControl(): AbstractControl {
    return this.thirdFormGroup.get('typeSocNetworks');
  }

  public get socNetworksControl(): AbstractControl {
    return this.thirdFormGroup.get('socNetworks');
  }

  public get passwordControl(): AbstractControl {
    return this.fourthFormGroup.get('password');
  }

  public get confirmPasswordControl(): AbstractControl {
    return this.fourthFormGroup.get('confirmPassword');
  }

  // <--------------- Error Handlers --------------->

  public getErrorMessageEmail(): string {
    if (this.emailControl.hasError('required')) { return 'You must enter a value'; }
    if (this.emailControl.hasError('email')) { return 'Not a valid email. Email must be contains @!'; }
    if (this.emailControl.hasError('pattern')) { return 'Not a valid email. Email must be contains .com or .ru domains!'; }
  }

  public getErrorMessagePhone(): string {
    return this.phoneControl.hasError('required') ? 'You must enter a value' :
      this.phoneControl.hasError('pattern') ? 'Not a valid phone. Input your russian number, please!' :
        '';
  }

  public getErrorMessageNickname(): string {
    return this.nicknameControl.hasError('required') ? 'You must enter a value' :
      this.nicknameControl.hasError('minLength') ? '' :
        'Not a valid nickname. Min length must be 8 symbols! ';
  }

  public getErrorMessageSocialNetworks(): string {
    return this.socNetworksControl.hasError('facebook') ? 'Not a valid facebook network!' :
      this.socNetworksControl.hasError('socialNetValidator') ? '' :
        'Not a valid github network!';
  }

  public getErorMessagePassword(): string {
    return this.passwordControl.hasError('required') ? 'You must enter a value' :
      this.passwordControl.hasError('minLength') ? '' :
        'Not a valid password. Min length must be 5 symbols! ';
  }

  public getErrorMessageConfirmPassword(): string {
    return this.confirmPasswordControl.hasError('required') ? 'You must enter a value' :
      this.confirmPasswordControl.hasError('confirmValidator') ? 'Passwords dont match! You must enter same passwords!' :
      '';
  }

  // <--------------- Add, Remove --------------->

  public addAddress(): void {
    this.addressControl.push(this._formBuilder.control(''));
  }

  public removeAddress(i: number): void {
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

  public putValues(): Observable<UserModel> {
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
        tap((data: UserModel) => {
          this.id += 1;
          console.log('POST request is successfull', data);
          this.isQuerySuccess.emit();
        }, (error) => {
          console.log('Query is not success! Error: ', error);
        })
      );
  }

  // <--------------- Change user data --------------->

  public updateUser(user: UserModel): Observable<any> {
    return this._http.put('http://localhost:3000/users/' + this.userInfo.id, user);
  }

  public deleteUser(id: number): Observable<any> {
    return this._http.delete('http://localhost:3000/users/' + id);
  }

  private _handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Form is invalid! You must fill and try again!');
  }

  public resetForm(stepper: MatStepper): void {
    this.isQuerySuccess.subscribe(
      stepper.reset()
    );
  }

}
