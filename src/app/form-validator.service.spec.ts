import { FormControl, FormGroup } from '@angular/forms';
import { FormValidatorService } from './form-validator.service';
describe('#FormValidatorService', () => {
  let subject: FormValidatorService;
  beforeEach(() => {
    subject = new FormValidatorService();
  });
  it('should create', () => {
    expect(subject).toBeTruthy();
  });
  describe('#validateEmail', () => {
    it('should return null if correct e-mail provided', () => {
      const formControlStub = new FormControl('test@test.ru', [
        subject.validateEmail(),
      ]);
      expect(formControlStub.errors).toBeNull();
    });
    it('should return error if not e-mail provided', () => {
      const formControlStub = new FormControl('test@test', [
        subject.validateEmail(),
      ]);
      expect(formControlStub.errors).toEqual({
        validateEmailError: true,
      });
    });
  });
  describe('#validateRequired', () => {
    it('should return null if not empty value provided', () => {
      const formControlStub = new FormControl('test', [
        subject.validateRequired(),
      ]);
      expect(formControlStub.errors).toBeNull();
    });
    it('should return error if empty value provided', () => {
      const formControlStub = new FormControl('', [subject.validateRequired()]);
      expect(formControlStub.errors).toEqual({
        validateRequiredError: true,
      });
    });
  });
  describe('#validateMinLength', () => {
    it('should return null if value length > min length', () => {
      const formControlStub = new FormControl('test', [
        subject.validateMinLength(3),
      ]);
      expect(formControlStub.errors).toBeNull();
    });
    it('should return error if value length < min length', () => {
      const formControlStub = new FormControl('test', [
        subject.validateMinLength(5),
      ]);
      expect(formControlStub.errors).toEqual({ validateMinLengthError: true });
    });
  });
  describe('#validateMaxLength', () => {
    it('should return null if value length < max length', () => {
      const formControlStub = new FormControl('test', [
        subject.validateMaxLength(5),
      ]);
      expect(formControlStub.errors).toBeNull();
    });
    it('should return error if value length > max length', () => {
      const formControlStub = new FormControl('test', [
        subject.validateMaxLength(3),
      ]);
      expect(formControlStub.errors).toEqual({ validateMaxLengthError: true });
    });
  });
  describe('#validatePasswords', () => {
    it('should return null if password and confirmPassword are same', () => {
      const passwordStub = new FormControl('password');
      const confirmPasswordStub = new FormControl('password');
      const formStub = new FormGroup(
        {
          password: passwordStub,
          confirmPassword: confirmPasswordStub,
        },
        { validators: subject.comparePasswords() }
      );
      expect(formStub.errors).toBeNull();
    });
    it('should return error if password and confirmPassword not same', () => {
      const passwordStub = new FormControl('password');
      const confirmPasswordStub = new FormControl('anotherPassword');
      const formStub = new FormGroup(
        {
          password: passwordStub,
          confirmPassword: confirmPasswordStub,
        },
        { validators: subject.comparePasswords() }
      );
      expect(formStub.errors).toEqual({ validatePasswordsError: true });
    });
  });
});
