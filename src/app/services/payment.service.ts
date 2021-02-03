import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentService {
  options;
  domain = this.authService.domain;

  constructor(private authService: AuthService, private http: Http) {}

  /* ===============================================================
      Function to create headers, add token, to be used in HTTP requests
  =============================================================== */
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        authorization: this.authService.authToken // Attach token
      })
    });
  }

  /* ===============================================================
      Schedule appointment and charge customer
  =============================================================== */

  authorizePayment(charge) {
    this.createAuthenticationHeaders();
    return this.http
      .post(this.domain + 'payments/charge/authorize', charge, this.options)
      .map(res => res.json());
  }

  chargePayment(chargeId) {
    this.createAuthenticationHeaders();
    return this.http
      .post(this.domain + 'payments/charge/debit', chargeId, this.options)
      .map(res => res.json());
  }
}

