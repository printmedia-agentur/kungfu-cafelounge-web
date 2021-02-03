import { ApiService } from '../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { PagerService } from '../../../services/pager.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent implements OnInit {

  username = '';
  email = '';

  loading = false;

  futureUserAppointments = [0];
  pastUserAppointments = [0];

  // pager object
  pager: any = {};
  // paged items
  futureUserAppointmentsPaged: any[];

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private pagerService: PagerService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.email = profile.user.email; // Set e-mail
      if (profile.user.email) {
        this.apiService
          .getFutureAppointmentsByUser(this.email)
          .subscribe(appointments => {
            this.futureUserAppointments = appointments;
            this.setPage(1);
          });
        this.apiService
          .getPastAppointmentsByUser(this.email)
          .subscribe(appointments => {
            this.pastUserAppointments = appointments;
          });
        this.loading = false;
      }
    });
    // initialize to page 1
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.futureUserAppointments.length, page);

    // get current page of items
    this.futureUserAppointmentsPaged = this.futureUserAppointments.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
