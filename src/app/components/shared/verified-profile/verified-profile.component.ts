import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-verified-profile',
  templateUrl: './verified-profile.component.html',
  styleUrls: ['./verified-profile.component.css']
})
export class VerifiedProfileComponent implements OnInit {
  isEmailVerified: true;
  isPhoneVerified: true;
  email: any;

  loading;
  messageClass;
  message;

  constructor(private _router: Router, private authService: AuthService) {}

  checkUserVerified() {
    this.loading = true;
    this.authService.getProfile().subscribe(profile => {
      this.isEmailVerified = profile.user.isEmailVerified; // Set username
      this.isPhoneVerified = profile.user.isPhoneVerified;
      this.email = profile.user.email;
      console.log(this.isEmailVerified);
      this.loading = false;
    });
  }

  resendVerifyMail() {
    const email = {
      email: this.email
    };
    console.log(email)
    this.authService.resendVerifyMail(email).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
      } else {
        if (data.success) {
          this.messageClass = 'alert alert-success'; // Return success class
          this.message = data.message; // Return success message
          setTimeout(() => {
            this.message = null;
            this.messageClass = null; // Navigate back to route page
          }, 5000);
        }
      }
    });
  }

  ngOnInit() {
    this.checkUserVerified();
  }

}
