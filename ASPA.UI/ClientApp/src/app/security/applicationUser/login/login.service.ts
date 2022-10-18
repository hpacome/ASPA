import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../common/services/validation.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  readonly BASE_URI = 'https://localhost:44318/api';

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private http: HttpClient
  ) { }

  formModel = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required],
  });


  login() {
    this.validationService.check(this.formModel);
    if (this.formModel.valid) {
      var body = {
        Email: this.formModel.value.Email,
        Password: this.formModel.value.Password,
      }
      return this.http.post(this.BASE_URI + '/ApplicationUser/Login', body);
    }
  }
}
