import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';

import { ApplicationUserComponent } from './security/applicationUser/application-user.component';
import { RegistrationComponent } from './security/applicationUser/registration/registration.component';
import { RegistrationService } from './security/applicationUser/registration/registration.service';
import { LoginComponent } from './security/applicationUser/login/login.component';
import { LoginService } from './security/applicationUser/login/login.service';
import { ValidationService } from './common/services/validation.service';
import { NavMenuService } from './nav-menu/nav-menu.service';

import { ConfirmationEmailComponent } from './security/applicationUser/confirmation-email/confirmation-email.component';
import { ConfirmationEmailService } from './security/applicationUser/confirmation-email/confirmation-email.service';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegistrationComponent,
    ConfirmationEmailComponent,
    LoginComponent,
    CounterComponent,
    FetchDataComponent,
    ApplicationUserComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'applicationUser',
        component: ApplicationUserComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent,
            pathMatch: 'full'
          },
          {
            path: 'registration',
            component: RegistrationComponent,
            pathMatch: 'full'
          },
          {
            path: 'confirm-email',
            component: ConfirmationEmailComponent,
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'counter',
        component: CounterComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'fetch-data',
        component: FetchDataComponent,
        canActivate: [AuthorizeGuard]
      },
    ])
  ],
  providers: [
    RegistrationService,
    LoginService,
    ValidationService,
    ConfirmationEmailService,
    NavMenuService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizeInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
