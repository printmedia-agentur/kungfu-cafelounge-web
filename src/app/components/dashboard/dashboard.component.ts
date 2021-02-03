import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = '';
  firstName = '';
  email = '';

  userAppointments = [0];
  userCertificates = [0];

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Once component loads, get user's data to display on profile
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.firstName = profile.user.firstName; // Set username
      this.email = profile.user.email; // Set e-mail
      if (profile.user.email) {
        this.apiService
          .getAppointmentsByUser(this.email)
          .subscribe(appointments => {
            console.log(appointments);
            this.userAppointments = appointments;
          });
        this.apiService
          .getCertificatesByUser(this.email)
          .subscribe(certificates => {
            console.log(certificates);
            this.userCertificates = certificates;
          });
      }
    });
  }
}
