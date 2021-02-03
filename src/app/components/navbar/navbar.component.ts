import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  email = '';
  firstName = '';
  lastName = '';

  loading = false;

  constructor(
    public authService: AuthService,
    public apiService: ApiService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) {}

  // Function to logout user
  onLogoutClick() {
    this.authService.logout(); // Logout user
    this.flashMessagesService.show('Sie werden abgemeldet.', {
      cssClass: 'alert-info'
    }); // Set custom flash message
    this.router.navigate(['/auth/login']);
  }

  refresh() {
    this.apiService.clearCache().subscribe(data => {
      window.location.reload(); // Clear all variable states
    });
  }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.loading = true;
      // Once component loads, get user's data to display on profile
      this.authService.getProfile().subscribe(profile => {
        this.email = profile.user.email; // Set e-mail
        this.firstName = profile.user.firstName; // Set firstName
        this.lastName = profile.user.lastName; // Set lastName
        if (this.email) {
          this.loading = false;
        }
      });
    }
  }
}
