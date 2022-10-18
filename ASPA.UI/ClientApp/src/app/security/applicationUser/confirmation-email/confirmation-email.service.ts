import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ConfirmationEmailService {
  readonly BASE_URI = 'https://localhost:44318/api';

  constructor(
    private http: HttpClient
  ) { }

  confirmEmail(userId: string, code:string) {
    var body = {
      UserId: userId,
      ConfirmationCode: code,
    }
    return this.http.post(this.BASE_URI + '/ApplicationUser/ConfirmEmail', body);
  }
}
