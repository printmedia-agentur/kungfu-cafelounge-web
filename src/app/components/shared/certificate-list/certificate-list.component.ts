import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ApiService} from '../../../services/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.css']
})
export class CertificateListComponent implements OnInit {
  username = '';
  email = '';
  loading = false;
  userCertificates = [0];
  healformProducts = '';

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loading = true;
    // Once component loads, get user's data to display on profile
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.email = profile.user.email; // Set e-mail
      if (profile.user.email) {
        this.apiService
          .getCertificatesByUser(this.email)
          .subscribe(certificates => {
            if (this.userCertificates) {
              this.userCertificates = certificates;
            }
          });
        this.apiService
          .getProducts()
          .subscribe(products => {
            this.healformProducts = products;
            this.loading = false;
            console.log(this.healformProducts);
          });
      }
    });
    setTimeout(function() {
      console.log('jetzt');
      function anpassen() {
        $('.progress-bar').each(function() {
          const min = $(this).attr('aria-valuemin');
          const max = $(this).attr('aria-valuemax');
          const now = $(this).attr('aria-valuenow');
          const siz = (now - min) * 100 / (max - min);
          $(this).css('width', siz + '%');
        });
      }
      anpassen();
    }, 1400);

  }
}
