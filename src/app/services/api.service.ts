import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {PaymentService} from './payment.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiService {
  options;
  domain = environment.domain;

  constructor(private authService: AuthService, private http: Http, private paymentService: PaymentService) {
  }

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
      HTTP: Get HEALFORM Locations
  =============================================================== */
  getAppointmentLocations() {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + 'api/locations', this.options)
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: Get Appointment Types
  =============================================================== */
  getAppointmentTypes() {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + 'api/appointment-types', this.options)
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: Get Appointment it's availability dates
  =============================================================== */
  getAppointmentDatesById(
    selectedAppointmentTypeId,
    selectedAppointmentLocation,
    selectedMonthPicker
  ) {
    this.createAuthenticationHeaders();
    return this.http
      .get(
        this.domain +
        'api/availability/dates/' +
        selectedAppointmentTypeId +
        '/' +
        selectedMonthPicker +
        '/' +
        selectedAppointmentLocation,
        this.options
      )
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: Get Appointment it's availability times
  =============================================================== */
  getAppointmentTimesById(
    selectedAppointmentTypeId,
    selectedAppointmentLocation,
    selectedMonthPicker
  ) {
    this.createAuthenticationHeaders();
    return this.http
      .get(
        this.domain +
        'api/availability/times/' +
        selectedAppointmentTypeId +
        '/' +
        selectedMonthPicker +
        '/' +
        selectedAppointmentLocation,
        this.options
      )
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: Get all Appointments by User
  =============================================================== */
  getAppointmentsByUser(email) {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + 'api/user/' + email + '/appointments', this.options)
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: Get all future Appointments by User
  =============================================================== */
  getFutureAppointmentsByUser(email) {
    this.createAuthenticationHeaders();
    return this.http
      .get(
        this.domain + 'api/user/' + email + '/appointments/future',
        this.options
      )
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: Get all previous Appointments by User
  =============================================================== */
  getPastAppointmentsByUser(email) {
    this.createAuthenticationHeaders();
    return this.http
      .get(
        this.domain + 'api/user/' + email + '/appointments/previous',
        this.options
      )
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: Get next Appointment by User
  =============================================================== */
  getNextAppointmentsByUser(email) {
    this.createAuthenticationHeaders();
    return this.http
      .get(
        this.domain + 'api/user/' + email + '/appointments/next',
        this.options
      )
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: Get Appointment-Details by ID
  =============================================================== */
  getAppointmentDetailsById(id, email) {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + 'api/appointments/' + id, this.options)
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: Cancel Appointment by ID
  =============================================================== */
  cancelUserAppointment(id) {
    this.createAuthenticationHeaders();
    return this.http
      .put(this.domain + 'api/appointments/' + id + '/cancel', {}, this.options)
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: Get all Certificates by User
  =============================================================== */
  getCertificatesByUser(email) {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + 'api/user/' + email + '/certificates', this.options)
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: Get Certificates for a given appointmentID by User
  =============================================================== */
  getCertificatesForAppointmentTypeID(email, appointmentTypeID) {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + 'api/user/' + email + '/certificates/' + appointmentTypeID, this.options)
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: Get all available Healform products
  =============================================================== */
  getProducts() {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + 'api/products', this.options)
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: check for user certificates for scheduling
  =============================================================== */
  checkCertificates(certificate, appointmentTypeID, email) {
    this.createAuthenticationHeaders();
    return this.http
      .get(
        this.domain +
        'api/user/' +
        email +
        '/certificates/' +
        certificate +
        '/check/' +
        appointmentTypeID,
        this.options
      )
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: schedule appointment and charge customer
  =============================================================== */
  scheduleAppointment(scheduleObj) {
    this.createAuthenticationHeaders();
    console.log(scheduleObj);
    return this.http
      .post(this.domain + 'api/appointment/schedule', scheduleObj, this.options)
      .map(res => res.json());
  }

  /* ===============================================================
      HTTP: clear cache
  =============================================================== */
  clearCache() {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + 'api/cache/clear', this.options)
      .map(res => res.json());
  };
}
