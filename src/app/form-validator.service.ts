import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  private _emailPattern: RegExp =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  validateEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      this._emailPattern.test(control.value)
        ? null
        : { validateEmailError: true };
  }
  validateRequired(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value.length > 0 ? null : { validateRequiredError: true };
  }
  validateMinLength(length: number) {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value.length >= length ? null : { validateMinLengthError: true };
  }
  validateMaxLength(length: number) {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value.length < length ? null : { validateMaxLengthError: true };
  }
  comparePasswords(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null =>
      form.value.password === form.value.confirmPassword
        ? null
        : { validatePasswordsError: true };
  }
}
