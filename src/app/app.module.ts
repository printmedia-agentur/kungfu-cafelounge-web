// TODO: IMPORTANT https://go.dmnktoe.de/2YIbEmz -> fix potential security vulnerabilities in dependencies
// TODO: Put those appointment table lists in single components
// TODO: all css styles in one file - many span styles="" out there :/
// TODO: remove dashboard?
// TODO: richtiges scss design erstellen und nicht so ein rumgewichse mit dmnktoe.de/myhealform.css, du weißt
// TODO: cache angular http requests
// TODO: disable stripe button til all fields are chosen
// TODO: login component - disable navbar: https://go.dmnktoe.de/2YSXGhS
// TODO: fix glyphicons
// TODO: fix hotjar???
// TODO: buggy logout since new children routes
// TODO: refresh token from server
// TODO: ViewDestroyedError: Attempt to use a destroyed view: detectChanges
// TODO: die banner, ob das profil bestätigt wuden, blinken beim reload immer kurz auf
// TODO: payment request api, still buggy
// TODO: routes buggy
/* Pipes */
import {FilterPipe} from './components/appointments/appointment-schedule/filter.pipe';
import {CertificateFilterPipe} from './components/shared/certificate-list/certificate-filter.pipe';
/* Modules */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {McBreadcrumbsModule} from 'ngx-breadcrumbs';
import {LoadingBarHttpModule} from '@ngx-loading-bar/http';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AvatarModule} from 'ngx-avatar';
import {NgxStripeModule} from 'ngx-stripe';
import {HotjarModule} from 'ng-hotjar';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {NgxPayPalModule} from 'ngx-paypal';
import {IconsModule} from './modules/icons/icons.module';
/* Components */
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {LoginComponent} from './components/auth/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {BlogComponent} from './components/blog/blog.component';
import {EditBlogComponent} from './components/blog/edit-blog/edit-blog.component';
import {DeleteBlogComponent} from './components/blog/delete-blog/delete-blog.component';
import {PublicProfileComponent} from './components/public-profile/public-profile.component';
import {CertificatesComponent} from './components/certificates/certificates.component';
import {AppointmentScheduleComponent} from './components/appointments/appointment-schedule/appointment-schedule.component';
import {AppointmentListComponent} from './components/appointments/appointment-list/appointment-list.component';
import {AppointmentDetailComponent} from './components/appointments/appointment-detail/appointment-detail.component';
import {ShopListComponent} from './components/shop/shop-list/shop-list.component';
import {ShopDetailComponent} from './components/shop/shop-detail/shop-detail.component';
import {VerifiedProfileComponent} from './components/shared/verified-profile/verified-profile.component';
import {NextAppointmentComponent} from './components/shared/next-appointment/next-appointment.component';
import {AppointmentTableComponent} from './components/shared/appointment-table/appointment-table.component';
import {MainComponent} from './components/main/main.component';
import {AuthComponent} from './components/auth/auth/auth.component';
import {CertificateListComponent} from './components/shared/certificate-list/certificate-list.component';
import {PaymentRequestComponent} from './components/shared/payment-request/payment-request.component';
import { VerifyEmailComponent } from './components/shared/verify-email/verify-email.component';
/* Services */
import {AuthService} from './services/auth.service';
import {BlogService} from './services/blog.service';
import {ApiService} from './services/api.service';
import {PagerService} from './services/pager.service';
import {PaymentService} from './services/payment.service';
import {PaymentRequestService} from './services/payment-request.service';
/* Guards */
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from './guards/notAuth.guard';
/* Strategies */
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
/* Environment */
import {environment} from '../environments/environment';
/* Sentry/Error Handling */
import * as Sentry from '@sentry/browser';
Sentry.init({
  dsn: ''
});

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    EditBlogComponent,
    DeleteBlogComponent,
    PublicProfileComponent,
    CertificatesComponent,
    AppointmentScheduleComponent,
    FilterPipe,
    CertificateFilterPipe,
    AppointmentListComponent,
    AppointmentDetailComponent,
    ShopListComponent,
    ShopDetailComponent,
    VerifiedProfileComponent,
    NextAppointmentComponent,
    AppointmentTableComponent,
    MainComponent,
    AuthComponent,
    CertificateListComponent,
    PaymentRequestComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    McBreadcrumbsModule.forRoot(),
    FlashMessagesModule,
    NgxMyDatePickerModule.forRoot(),
    LoadingBarHttpModule,
    LoadingBarRouterModule,
    AvatarModule,
    NgxStripeModule.forRoot(environment.stripe),
    HotjarModule,
    NgxSkeletonLoaderModule,
    NgxPayPalModule,
    BrowserAnimationsModule,
    IconsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotAuthGuard,
    BlogService,
    ApiService,
    PagerService,
    PaymentService,
    PaymentRequestService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
