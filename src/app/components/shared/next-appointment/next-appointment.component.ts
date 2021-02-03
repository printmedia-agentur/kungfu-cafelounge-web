import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-next-appointment',
  templateUrl: './next-appointment.component.html',
  styleUrls: ['./next-appointment.component.css']
})
export class NextAppointmentComponent implements OnInit {
  username = '';
  email = '';

  loading = false;

  nextUserAppointments = [0];

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
          .getNextAppointmentsByUser(this.email)
          .subscribe(appointments => {
            console.log(appointments);
            this.nextUserAppointments = appointments;
            console.log(this.nextUserAppointments);
            this.loading = false;
          });
      }
    });
  }
}
