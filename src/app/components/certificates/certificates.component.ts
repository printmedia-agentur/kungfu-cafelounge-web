import {ApiService} from './../../services/api.service';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {
  username = '';
  email = '';
  userCertificates = '';

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    // Once component loads, get user's data to display on profile
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.email = profile.user.email; // Set e-mail
      if (profile.user.email) {
        this.apiService
          .getCertificatesByUser(this.email)
          .subscribe(certificates => {
            this.userCertificates = certificates;
          });
      }
    });
  }
}
