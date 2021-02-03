import { ApiService } from './../../../services/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
  username = '';
  email = '';
  message;
  messageClass;
  getData: any;
  appointmentDetails = [0];
  date;
  time;
  id: number;
  private sub: any;
  loading: boolean;
  processing: boolean;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getData = this.getDataFunction;
    this.getData();
  }

  cancelAppointmentModal() {
    if (
      confirm(
        'Sind Sie sicher, dass Sie Ihren Termin am ' +
          this.date +
          ' um ' +
          this.time +
          ' Uhr, absagen möchten?'
      )
    ) {
      this.cancelAppointment();
    }
  }

  cancelAppointment() {
    this.processing = true;
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.email = profile.user.email; // Set e-mail
      if (profile.user.email) {
        this.apiService.cancelUserAppointment(this.id).subscribe(data => {
          console.log(this.id);
          if (!data.success) {
            this.messageClass = 'alert alert-danger'; // Set error bootstrap class
            this.message = data.message; // Set error message
            this.processing = true;
          } else {
            this.apiService.clearCache();
            this.messageClass = 'alert alert-success'; // Set success bootstrap class
            this.message = data.message; // Set success message
            this.processing = false;
            setTimeout(() => {
              this.router.navigate(['/app/meine-termine']); // Navigate back to route page
            }, 2000);
            // After two seconds, navigate back to blog page
          }
        });
      }
    });
  }

  getDataFunction() {
    this.loading = true;
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.email = profile.user.email; // Set e-mail
      if (profile.user.email) {
        console.log(this.id);
        this.apiService
          .getAppointmentDetailsById(this.id, this.email)
          .subscribe(appointmentDetails => {
            if (appointmentDetails.hasOwnProperty('success')) {
              this.messageClass = 'alert alert-danger'; // Set error bootstrap class
              this.message = appointmentDetails.message; // Set error message
              this.loading = false;
              setTimeout(() => {
                this.router.navigate(['/#/app/meine-termine']); // Navigate back to route page
              }, 5000);
            } else {
              console.log(appointmentDetails);
              this.appointmentDetails = appointmentDetails;
              this.date = appointmentDetails.date;
              this.time = appointmentDetails.time;
              this.loading = false;
            }
          });
      }
    });
  }
}
