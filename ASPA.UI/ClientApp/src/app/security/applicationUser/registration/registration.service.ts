import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidationService } from '../../../common/services/validation.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
  readonly BASE_URI = 'https://localhost:44318/api';

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private http: HttpClient
  ) { }

  formModel = this.fb.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,32}[a-zA-Z0-9.!@#$%^&:;<>,.?/~_+-=|\(){}]+$")]],
      ConfirmPassword: ['', Validators.required]
    }, { validators: this.validationService.comparePasswords })
  });

  register() {
    this.validationService.check(this.formModel);
    if (this.formModel.valid) {
      var body = {
        FirstName: this.formModel.value.FirstName,
        LastName: this.formModel.value.LastName,
        Email: this.formModel.value.Email,
        Password: this.formModel.value.Passwords.Password
      }
      return this.http.post(this.BASE_URI + '/ApplicationUser/Register', body);
    }
  }

  confirmEmail(email) {
    return this.http.get(`${this.BASE_URI}/ApplicationUser/SendConfirmationEmail?email=${email}`);
  }
}
