import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = '';
  email = '';
  phone = '';
  firstName = '';
  lastName = '';
  street = '';
  city = '';
  postcode = '';
  country = '';
  birthdate = '';
  stripeID = '';
  isEmailVerified = '';
  isPhoneVerified = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Once component loads, get user's data to display on profile
    // TODO: alle "if (this.authService.loggedIn())" wieder raus - bringt leider doch nichts: Cannot read property 'email' of undefined
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(profile => {
        this.username = profile.user.username; // Set username
        this.email = profile.user.email; // Set e-mail
        this.phone = profile.user.phone; // Set e-mail
        this.firstName = profile.user.firstName; // Set firstName
        this.lastName = profile.user.lastName; // Set lastName
        this.street = profile.user.street; // Set street
        this.city = profile.user.city; // Set city
        this.postcode = profile.user.postcode; // Set postcode
        this.country = profile.user.country; // Set postcode
        this.birthdate = profile.user.birthdate; // Set birthdate
        this.stripeID = profile.user.stripeID; // set stripe customer id
      });
    }
  }
}
