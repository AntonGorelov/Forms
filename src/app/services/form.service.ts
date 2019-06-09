import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';


@Injectable()
export class FormService {

  constructor() {}

  public hobbies = [];

  public cardForm: FormGroup;

  public emailRegex =
    '^[-a-z0-9!#$%&\'*+/=?^_`{|}~]+(?:\\.[-a-z0-9!#$%&\'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\\.)*(?:com|ru)$';
  public phoneRegex = '^(\\+7|7|8)?[\\s\\-]?\\(?[489][0-9]{2}\\)?[\\s\\-]?[0-9]{3}[\\s\\-]?[0-9]{2}[\\s\\-]?[0-9]{2}$';

  public date = new Date();
  public maxDate = this.date.setDate(this.date.getDate() - 1);

  public createNewForm(): void {
    this.cardForm = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName:  new FormControl('', Validators.required)
      }),
      email:    new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailRegex)]),
      phone:    new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)]),
      nickname: new FormControl('', [Validators.required, Validators.minLength(8)]),
      birthday: new FormControl('', Validators.required),
      hobbyVal: new FormGroup( {
        hobbyArray:       new FormArray([], Validators.required),
        hobbyFormControl: new FormControl('', Validators.minLength(7))
      }),
      sex:      new FormControl('', Validators.required),
      note:     new FormControl('', Validators.minLength(50))
    });
  }

  public get emailControl(): AbstractControl {
    return this.cardForm.get('email');
  }

  public get phoneControl(): AbstractControl {
    return this.cardForm.get('phone');
  }

  public get nicknameControl(): AbstractControl {
    return this.cardForm.get('nickname');
  }

  public get hobbyControl(): AbstractControl {
    return this.cardForm.get('hobbyVal.hobbyFormControl');
  }

  public get hobbyArray(): AbstractControl {
    return this.cardForm.get('hobbyVal.hobbyArray');
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

  public onSubmit(): void {
    if (this.cardForm.valid) {
      console.log('FormService data: ', this.cardForm.controls);
    }
  }

  public clearForm(): void {
    this.cardForm.reset();
  }


  private _hobbyValidator(): ValidatorFn {
    // for (let i = 0; i < this.cardForm.get('hobby').value.length; i++ ) {
    //
    // }
    return (control: FormArray) => {
      const error = [];
      control.controls.forEach(item => item.invalid && error.push(item.value));

      return null;
    };
  }
}
