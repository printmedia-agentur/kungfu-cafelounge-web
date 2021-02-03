import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  token: string;
  private sub: any;
  loading: boolean;

  messageClass;
  message;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.token = params['token']; // (+) converts string 'id' to a number
      const token = {
        token: this.token
      };
      this.authService.verifyMail(token).subscribe(data => {
        if (!data.success) {
          this.messageClass = 'alert alert-danger'; // Return error class
          this.message = data.message; // Return error message
        } else {
          if (data.success) {
            this.messageClass = 'alert alert-success'; // Return success class
            this.message = data.message; // Return success message
          }
        }
      });
    });
  }

}
