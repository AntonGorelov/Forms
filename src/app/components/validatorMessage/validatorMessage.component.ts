import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-validator-message',
  templateUrl: './validatorMessage.component.html',
  styleUrls: ['./validatorMessage.component.css']
})
export class ValidatorMessageComponent {

  @Input() field: FormControl;

  public get validatorMessages() {

    const field = this.field;
    const errors = [];

    const config = {
      required: 'Field is required! Input value, please!',
      email: 'Not a valid email. Email must be contains @!',
      patternEmail: 'Not a valid email. Email must be contains .com or .ru domains!',
      patternPhone: 'Not a valid phone. Input your russian number, please!',
      minLengthNickName: 'Not a valid nickname. Min length must be 8 symbols!',
      minLengthChips: 'Not a valid chips. Min Length = 7'
    };

    if ( !field || !field.errors ) {
      return false;
    }

    Object.keys(field.errors).forEach((error: string) => {errors.push(config[error]); } );

    return errors;
  }
}
