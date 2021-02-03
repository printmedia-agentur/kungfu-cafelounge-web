import {AppointmentListComponent} from './components/appointments/appointment-list/appointment-list.component';
import {AppointmentDetailComponent} from './components/appointments/appointment-detail/appointment-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AppointmentScheduleComponent} from './components/appointments/appointment-schedule/appointment-schedule.component';
import {CertificatesComponent} from './components/certificates/certificates.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {LoginComponent} from './components/auth/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {PublicProfileComponent} from './components/public-profile/public-profile.component';
import {BlogComponent} from './components/blog/blog.component';
import {EditBlogComponent} from './components/blog/edit-blog/edit-blog.component';
import {DeleteBlogComponent} from './components/blog/delete-blog/delete-blog.component';
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from './guards/notAuth.guard';
import {ShopListComponent} from './components/shop/shop-list/shop-list.component';
import {ShopDetailComponent} from './components/shop/shop-detail/shop-detail.component';
import {MainComponent} from './components/main/main.component';
import {AuthComponent} from './components/auth/auth/auth.component';
import {HashLocationStrategy} from '@angular/common';
import { VerifyEmailComponent } from './components/shared/verify-email/verify-email.component';

// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  {
    path: 'app',
    component: MainComponent,
    children:
      [
        {
          path: 'start',
          component: HomeComponent // Default Route
        },
        {
          path: 'dashboard',
          component: DashboardComponent, // Dashboard Route,
          canActivate: [AuthGuard],
          data: {
            breadcrumbs: 'Dashboard'
          }
        },
        {
          path: 'termin-buchen',
          component: AppointmentScheduleComponent, // Dashboard Route,
          canActivate: [AuthGuard],
          data: {
            breadcrumbs: 'Termin buchen'
          } // User must be logged in to view this route
        },
        {
          path: 'meine-termine',
          component: AppointmentListComponent,
          canActivate: [AuthGuard],
          data: {
            breadcrumbs: 'Meine Termine'
          }
        },
        {
          path: 'termin/details/:id',
          component: AppointmentDetailComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'meine-abos',
          component: CertificatesComponent, // Dashboard Route,
          canActivate: [AuthGuard] // User must be logged in to view this route
        },
        {
          path: 'register',
          component: RegisterComponent, // Register Route
          canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
        },
        {
          path: 'login',
          component: LoginComponent, // Login Route
          canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
        },
        {
          path: 'mein-profil',
          component: ProfileComponent, // Profile Route
          canActivate: [AuthGuard] // User must be logged in to view this route
        },
        {
          path: 'shop',
          component: ShopListComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'shop/produkt/:id',
          component: ShopDetailComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'blog',
          component: BlogComponent, // Blog Route,
          canActivate: [AuthGuard] // User must be logged in to view this route
        },
        {
          path: 'edit-blog/:id',
          component: EditBlogComponent, // Edit Blog Route
          canActivate: [AuthGuard] // User must be logged in to view this route
        },
        {
          path: 'delete-blog/:id',
          component: DeleteBlogComponent, // Delete Blog Route
          canActivate: [AuthGuard] // User must be logged in to view this route
        },
        {
          path: 'user/:username',
          component: PublicProfileComponent, // Public Profile Route
          canActivate: [AuthGuard] // User must be logged in to view this route
        },
        {
          path: 'verify/email/:token',
          component: VerifyEmailComponent,
        },
      ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children:
      [
        {
          path: 'register',
          component: RegisterComponent, // Register Route
          canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
        },
        {
          path: 'login',
          component: LoginComponent, // Login Route
          canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
        }
      ]
  },
  {
    path: '',
    redirectTo: 'app/start',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'app/start',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { useHash: true})],
  providers: [
    HashLocationStrategy
  ],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
