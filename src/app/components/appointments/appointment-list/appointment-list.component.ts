import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  username = '';
  email = '';
  appointments = '';

  loading = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Once component loads, get user's data to display on profile
    this.loading = true;
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.email = profile.user.email; // Set e-mail
      if (profile.user.email) {
        this.apiService
          .getAppointmentsByUser(this.email)
          .subscribe(appointments => {
            console.log(appointments);
            this.appointments = appointments;
            console.log(this.appointments);
            this.loading = false;
          });
      }
    });
  }
}
