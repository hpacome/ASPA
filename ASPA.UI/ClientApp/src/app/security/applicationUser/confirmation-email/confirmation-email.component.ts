import { Component, Inject, OnInit } from '@angular/core';
import { ConfirmationEmailService } from './confirmation-email.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmation-email',
  templateUrl: './confirmation-email.component.html',
  styleUrls: [
    '../application-user.component.css',
    '../../../../../node_modules/bootstrap-float-label/dist/bootstrap-float-label.min.css'
  ]
})

export class ConfirmationEmailComponent {
  public complete: boolean = false;
  public validationSuccess: boolean;
  public registeredEmail: string;
  public confirmationCode: string;
  public userId: string;

  constructor(
    private confirmationEmailService: ConfirmationEmailService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.userId = this.getUrlParameter("userid");
    this.confirmationCode = this.getUrlParameter("code")
  }

  ngOnInit(): void {
    this.confirmationEmailService.confirmEmail(this.userId, this.confirmationCode).subscribe(
      (res: any) => {
        if (res.succeded) {
          this.registeredEmail = res.registrationEmail;
          this.complete = true;
          this.validationSuccess = true;
        } else {
          res.info.forEach(element => {
            this.complete = true;
            this.validationSuccess = false;
            this.toastr.error(element.Message, element.code);
          });
        }
      },
      err => {
        this.complete = true;
        this.validationSuccess = false;
        console.error(err);
      }
    );
  }

  public getUrlParameter(sParam) {
    return decodeURIComponent(window.location.search.substring(1))
      .split('&')
      .map((v) => { return v.split("=") })
      .filter((v) => { return (v[0] === sParam) ? true : false })
      .reduce((acc: any, curr: any) => { return curr[1]; }, undefined);
  };

  gotoLogin() {
    this.router.navigate(['/applicationUser/login']);
  }

  gotoHome() {
    this.router.navigate(['']);
  }
}
