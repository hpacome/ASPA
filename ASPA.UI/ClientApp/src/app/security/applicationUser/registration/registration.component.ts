import { Component, Inject, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [
    '../application-user.component.css',
    '../../../../../node_modules/bootstrap-float-label/dist/bootstrap-float-label.min.css'
  ]
})

export class RegistrationComponent {
  public complete: boolean = false;
  public registeredEmail: string;

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  gotoLogin() {
    this.registrationService.formModel.reset();
    this.router.navigate(['/applicationUser/login']);
  }

  onSubmit() {
    this.registrationService.register().subscribe(
      (res: any) => {
        if (res.succeded) {
          this.registrationService.formModel.reset();
          this.registeredEmail = res.registrationEmail;
          this.complete = true;
        } else {
          res.info.forEach(element => {
            this.toastr.error(element.Message, element.code);
          });
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  reResendEmail() {
    this.registrationService.confirmEmail(this.registeredEmail).subscribe(
      (res: any) => {
        if (res.succeded) {
          this.registeredEmail = res.RegistrationEmail;
        } else {
          res.info.forEach(element => {
            this.toastr.error(element.Message, element.code);
          });
        }
      },
      err => {
        console.error(err);
      }
    );
  }
}
