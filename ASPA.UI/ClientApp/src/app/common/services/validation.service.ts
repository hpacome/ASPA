import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {

  constructor() { }

  comparePasswords(fb: FormGroup) {
    let confirmPswdCtrl = fb.get('ConfirmPassword');
    if (confirmPswdCtrl.errors == null || 'passwordMismatch' in confirmPswdCtrl.errors) {
      if (fb.get('Password').value != confirmPswdCtrl.value)
        confirmPswdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswdCtrl.setErrors(null);
    }
  }

  check(fb: FormGroup) {
    Object.keys(fb.controls).forEach(field => {
      const ctrl = fb.get(field);
      if (ctrl instanceof FormGroup)
        this.check(ctrl);
      else if (ctrl != null && ctrl != undefined)
        ctrl.markAsTouched({ onlySelf: true });
    });
  }
}
