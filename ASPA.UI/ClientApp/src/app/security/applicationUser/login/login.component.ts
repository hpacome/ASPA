import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../application-user.component.css',
    '../../../../../node_modules/bootstrap-float-label/dist/bootstrap-float-label.min.css'
  ]
})

export class LoginComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    public router: Router,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    
  }

  gotoRegistration() {
    this.loginService.formModel.reset();
    this.router.navigate(['/applicationUser/registration']);
  }

  onSubmit() {
    this.loginService.login().subscribe(
      (res: any) => {
        if (res.succeded) {
          this.loginService.formModel.reset();
          this.toastr.success("User login", "Login successful.");
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
