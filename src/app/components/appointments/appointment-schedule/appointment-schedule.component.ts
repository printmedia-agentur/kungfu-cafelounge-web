import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ApiService} from '../../../services/api.service';
import * as moment from 'moment';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {ElementOptions, Elements, ElementsOptions, StripeCardComponent, StripeService} from 'ngx-stripe';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {AppointmentFields} from '../../../models/appointment.model';
import { Router, ActivatedRoute } from '@angular/router';

declare var hljs: any;

@Component({
  selector: 'app-appointment-schedule',
  templateUrl: './appointment-schedule.component.html',
  styleUrls: ['./appointment-schedule.component.css']
})
export class AppointmentScheduleComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  elements: Elements;

  public payPalConfig?: IPayPalConfig;

  public showSuccess: boolean;
  public showCancel: boolean;
  public showError: boolean;

  appointmentDateOptions: INgxMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: true,
    sunHighlight: true,
    monthLabels: {
      1: 'Januar',
      2: 'Februar',
      3: 'März',
      4: 'April',
      5: 'Mai',
      6: 'Juni',
      7: 'Juli',
      8: 'August',
      9: 'September',
      10: 'Oktober',
      11: 'November',
      12: 'Dezember'
    },
    dayLabels: {
      su: 'So',
      mo: 'Mo',
      tu: 'Di',
      we: 'Mi',
      th: 'Do',
      fr: 'Fr',
      sa: 'Sa'
    }
  };

  messageClass;
  message;
  disableInput;
  loading: boolean;

  // set User details
  username = '';
  firstName = '';
  lastName = '';
  fullName = '';
  email = '';
  phone = '';
  street = '';
  city = '';
  postcode = '';
  stripeID = '';

  // charge details
  stripeToken: any;

  // appointment availability infos
  appointmentLocations = [];
  appointmentTypes = [];
  appointmentTimes = [];

  // appointment object
  selectedAppointmentType;
  selectedAppointmentTypeId = '';
  selectedAppointmentLocation = '';
  selectedDate: any = { jsdate: new Date() };
  formattedDate = '';
  selectedAppointmentTime = '';
  selectedAppointmentPricing = '';
  selectedAppointmentPricingFormatted = '';
  selectedCertificateCode = '';
  selectedCertificateRemaining = '';
  selectedPaymentMethod = '';
  public appointmentFields: AppointmentFields[];

  // certificates
  userCertificates = [0];
  checkCertificates = [0];

  // stripe elements
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: 300,
        fontFamily: 'Circular Std, Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'de'
  };

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private stripeService: StripeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.appointmentFields = new Array<AppointmentFields>();
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.firstName = profile.user.firstName; // Set username
      this.lastName = profile.user.lastName; // Set username
      this.fullName = profile.user.firstName + ' ' + profile.user.lastName; // Set username
      this.email = profile.user.email;
      this.phone = profile.user.phone;
      this.street = profile.user.street;
      this.city = profile.user.city;
      this.postcode = profile.user.postcode;
      this.stripeID = profile.user.stripeID; // Set e-mail
      if (profile.user.email) {
        this.getData();
      }
    });
    console.log(this.selectedDate);
    this.formatDate(this.selectedDate);
    console.log(this.formattedDate);
    this.disableInput = 'disabled';
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.selectedAppointmentPricing,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.selectedAppointmentPricing
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: this.selectedAppointmentPricing,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;

      },
      onError: err => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: () => {
        console.log('onClick');
        this.resetStatus();
      },
    };
  }

  private resetStatus(): void {
    this.showError = false;
    this.showSuccess = false;
    this.showCancel = false;
  }

  private prettify(): void {
    hljs.initHighlightingOnLoad();
  }

  formatDate(selectedDate) {
    this.formattedDate = moment(selectedDate.jsdate).format(
      'YYYY-MM-DD'
    );
  };

  buyViaStripe() {
    this.loading = true;
    if (this.selectedPaymentMethod === 'stripe') {
      // generate stripe token
      this.stripeService
        .createToken(this.card.getCard(), {name: this.fullName})
        .subscribe(result => {
          if (result.token) {
            console.log(result.token);
            this.stripeToken = result.token.id;
            // create appointment object
            const appointment = {
              appointmentTypeID: this.selectedAppointmentTypeId,
              calendarID: this.selectedAppointmentLocation,
              datetime: this.selectedAppointmentTime,
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              phone: this.phone,
              fields: [
                // Acuity In-Take Form: Street
                {
                  id: '4427117',
                  value: this.street
                },
                // Acuity In-Take Form: Haus-Nr.
                {
                  id: '4427118',
                  value: '10'
                },
                // Acuity In-Take Form: Postcode
                {
                  id: '4308596',
                  value: this.postcode
                },
                // Acuity In-Take Form: City
                {
                  id: '4427123',
                  value: this.city
                },
                // Acuity In-Take Krankheitsbild
                {
                  id: '4295117',
                  value: 'Tinnitus'
                }
              ]
            };
            // create charge object
            const charge = {
              paymentMethod: this.selectedPaymentMethod,
              stripeId: this.stripeID,
              stripeToken: this.stripeToken,
              amount: this.selectedAppointmentPricingFormatted,
              description: 'Ihr Einkauf bei KungFu Cafelounge - ' + this.email
            };
            const scheduleObj = {
              appointment,
              charge
            };
            // Function to schedule appointment and charge customer
            this.apiService.scheduleAppointment(scheduleObj).subscribe( data => {
              // Check if blog was saved to database or not
              // TODO: ts2339 property 'success' does not exist on type
              if (!data.success) {
                this.messageClass = 'alert alert-danger'; // Return error class
                this.message = data.message; // Return error message
                this.loading = false; // Enable submit button
              } else {
                if (data.success) {
                  this.messageClass = 'alert alert-success'; // Return success class
                  this.message = data.message; // Return success message
                  this.loading = false;
                  setTimeout(() => {
                    this.router.navigate(['/app/meine-termine']); // Navigate back to route page
                  }, 2000);
                  // After two seconds, navigate back to blog page
                }
              }
            });
          } else if (result.error) {
            this.messageClass = 'alert alert-danger'; // Return error class
            this.message = 'Es ist ein Fehler aufgetreten: ' + result.error.message; // Return error message
            this.loading = false; // Enable submit button
          }
        });
    } else {
      console.log('es ist ein fehler aufgetreten');
    }
  }

  buyViaCertificate() {
    this.loading = true;
    if (this.selectedPaymentMethod === 'certificate') {
      // create appointment object
      const appointment = {
        appointmentTypeID: this.selectedAppointmentTypeId,
        calendarID: this.selectedAppointmentLocation,
        datetime: this.selectedAppointmentTime,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        // certificate: this.selectedCertificateCode,
        fields: [
          // Acuity In-Take Form: Street
          {
            id: '4427117',
            value: this.street
          },
          // Acuity In-Take Form: Haus-Nr.
          {
            id: '4427118',
            value: '10'
          },
          // Acuity In-Take Form: Postcode
          {
            id: '4308596',
            value: this.postcode
          },
          // Acuity In-Take Form: City
          {
            id: '4427123',
            value: this.city
          },
          // Acuity In-Take Krankheitsbild
          {
            id: '4295117',
            value: 'Tinnitus'
          }
        ],
        certificate: this.selectedCertificateCode
      };
      // create charge object
      const charge = {
        paymentMethod: this.selectedPaymentMethod
      };
      const scheduleObj = {
        appointment,
        charge
      };
      // Function to schedule appointment and charge customer
      this.apiService.scheduleAppointment(scheduleObj).subscribe(data => {
        // Check if blog was saved to database or not
        if (!data.success) {
          this.messageClass = 'alert alert-danger'; // Return error class
          this.message = data.message; // Return error message
          this.loading = false; // Enable submit button
        } else {
          if (data.success) {
            this.messageClass = 'alert alert-success'; // Return success class
            this.message = data.message; // Return success message
            this.loading = false;
            setTimeout(() => {
              this.router.navigate(['/app/meine-termine']); // Navigate back to route page
            }, 2000);
            // After two seconds, navigate back to blog page
          }
        }
      });
    } else {
      console.log('fehler');
    }
  }

  onChangeLocation(LocationId) {
    console.log(LocationId);
    this.selectedAppointmentLocation = LocationId;
    // check if a value exists and use it
    if (this.selectedAppointmentType) {
      this.onChangeTypeId(this.selectedAppointmentType);
    }
    this.messageClass = null; // Return error class
    this.message = null;
  }

  onDateSelect(Date) {
    console.log(Date.formatted);
    // this.selectedDate = Date;
    this.formattedDate = moment(Date.formatted, 'DD.MM.YYYY').format(
      'YYYY-MM-DD'
    );
    console.log('test' + this.formattedDate);
    // check if a value exists and use it
    if (this.selectedAppointmentType) {
      this.onChangeTypeId(this.selectedAppointmentType);
    }
  }

  onCertificateSelect(Certificate) {
    console.log(Certificate);
    this.selectedCertificateCode = Certificate.code;
    this.selectedCertificateRemaining = Certificate.remaining;
    this.validateCertificates(this.selectedCertificateCode);
  }

  convertStripeAmount(amount) {
    this.selectedAppointmentPricingFormatted = amount.replace(/\./g, '');
    console.log(this.selectedAppointmentPricingFormatted);
  }

  onChangeTypeId(selectedAppointmentType) {
    if (this.selectedAppointmentLocation) {
      this.selectedAppointmentTypeId = selectedAppointmentType.id;
      this.selectedAppointmentPricing = selectedAppointmentType.price;
      this.convertStripeAmount(this.selectedAppointmentPricing);
      this.selectedCertificateCode = null;
      this.selectedCertificateRemaining = null;
      this.checkCertificates = null;
      this.apiService
        .getAppointmentTimesById(
          this.selectedAppointmentTypeId,
          this.selectedAppointmentLocation,
          this.formattedDate
        )
        .subscribe(data => {
          this.appointmentTimes = data;
        });
      this.apiService
        .getCertificatesForAppointmentTypeID(
          this.email,
          this.selectedAppointmentTypeId
        )
        .subscribe(data => {
          this.userCertificates = data;
          console.log(this.userCertificates);
          if (this.userCertificates.length === 0) {
            this.disableInput = 'disabled';
          } else {
            this.disableInput = null;
          }
        });
    } else {
      this.messageClass = 'alert alert-danger'; // Return error class
      this.message = 'Bitte wählen Sie zuerst einen Ort aus. Kassel oder Baunatal.';
    }
  }

  public getData() {
    this.apiService.getAppointmentLocations().subscribe(data => {
      this.appointmentLocations = data;
      console.log(data);
    });
    this.apiService.getAppointmentTypes().subscribe(data => {
      this.appointmentTypes = data;
      console.log(data);
    });
  }

  validateCertificates(CertificateCode) {
    this.apiService
      .checkCertificates(CertificateCode, this.selectedAppointmentTypeId, this.email)
      .subscribe(data => {
        this.checkCertificates = data;
        console.log(data);
      });
  }

}
