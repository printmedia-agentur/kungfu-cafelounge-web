import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { format } from 'libphonenumber-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  phoneValid;
  phoneMessage;
  usernameValid;
  usernameMessage;
  formattedPhone: any;

  birthdateOptions: INgxMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: false,
    sunHighlight: false,
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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm(); // Create Angular 2 Form when component loads
  }

  setDate(): void {
    // Set today date using the patchValue function
    const date = new Date();
    this.form.patchValue({
      birthdate: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

  clearDate(): void {
    // Clear the date using the patchValue function
    this.form.patchValue({ birthdate: null });
  }

  ngOnInit() {}

  // Function to create registration form
  createForm() {
    this.form = this.formBuilder.group(
      {
        // Email Input
        email: [
          '',
          Validators.compose([
            Validators.required, // Field is required
            Validators.minLength(5), // Minimum length is 5 characters
            Validators.maxLength(30), // Maximum length is 30 characters
            this.validateEmail // Custom validation
          ])
        ],
        phone: [
          '',
          Validators.compose([
            Validators.required, // Field is required
            Validators.minLength(7), // Minimum length is 3 characters
            Validators.maxLength(15), // Maximum length is 15 characters
            this.validatePhone // Custom validation
          ])
        ],
        // Username Input
        username: [
          '',
          Validators.compose([
            Validators.required, // Field is required
            Validators.minLength(3), // Minimum length is 3 characters
            Validators.maxLength(25), // Maximum length is 15 characters
            this.validateUsername // Custom validation
          ])
        ],
        // Password Input
        password: [
          '',
          Validators.compose([
            Validators.required, // Field is required
            Validators.minLength(8), // Minimum length is 8 characters
            Validators.maxLength(65), // Maximum length is 35 characters
            this.validatePassword // Custom validation
          ])
        ],
        // Confirm Password Input
        confirm: ['', Validators.required], // Field is required
        // First name Input
        firstName: [
          '',
          Validators.compose([
            Validators.required, // Field is required
            Validators.minLength(3), // Minimum length is 3 characters
            Validators.maxLength(50), // Maximum length is 15 characters
            this.validateFirstName // Custom validation
          ])
        ],
        lastName: [
          '',
          Validators.compose([
            Validators.required, // Field is required
            Validators.minLength(3), // Minimum length is 3 characters
            Validators.maxLength(50), // Maximum length is 15 characters
            this.validateLastName // Custom validation
          ])
        ],
        street: [
          '',
          Validators.compose([
            Validators.required, // Field is required
            Validators.minLength(3), // Minimum length is 3 characters
            Validators.maxLength(50), // Maximum length is 15 characters
            this.validateStreet // Custom validation
          ])
        ],
        city: [
          '',
          Validators.compose([
            Validators.required, // Field is required
            Validators.minLength(3), // Minimum length is 3 characters
            Validators.maxLength(50), // Maximum length is 15 characters
            this.validateCity // Custom validation
          ])
        ],
        postcode: [
          '',
          Validators.compose([
            Validators.required, // Field is required
            Validators.minLength(5), // Minimum length is 3 characters
            Validators.maxLength(5), // Maximum length is 15 characters
            this.validatePostcode // Custom validation
          ])
        ],
        country: [
          '',
          Validators.compose([
            Validators.required, // Field is required
            Validators.minLength(3), // Minimum length is 3 characters
            Validators.maxLength(50), // Maximum length is 15 characters
            this.validateCountry // Custom validation
          ])
        ],
        birthdate: [
          '',
          Validators.compose([
            Validators.required, // Field is required
            this.validateBirthdate // Custom validation
          ])
        ],
        acceptTerms: [
          '',
          Validators.compose([
            Validators.requiredTrue // Field is required
          ])
        ]
      },
      { validator: this.matchingPasswords('password', 'confirm') }
    ); // Add custom validator to form for matching passwords
  }

  // Function to disable the registration form
  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['phone'].enable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
    this.form.controls['firstName'].disable();
    this.form.controls['lastName'].disable();
    this.form.controls['street'].disable();
    this.form.controls['city'].disable();
    this.form.controls['postcode'].disable();
    this.form.controls['country'].disable();
    this.form.controls['birthdate'].disable();
  }

  // Function to enable the registration form
  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['phone'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
    this.form.controls['firstName'].enable();
    this.form.controls['lastName'].enable();
    this.form.controls['street'].enable();
    this.form.controls['city'].enable();
    this.form.controls['postcode'].enable();
    this.form.controls['country'].enable();
    this.form.controls['birthdate'].enable();
  }

  // Function to validate e-mail is proper format
  validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { validateEmail: true }; // Return as invalid email
    }
  }

  validatePhone(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[0-9 ()+-]+$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { validatePhone: true }; // Return as invalid email
    }
  }

  // Function to validate username is proper format
  validateUsername(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      console.log('auch');
      return { validateUsername: true }; // Return as invalid username
    }
  }

  // Function to validate password
  validatePassword(controls) {
    // Create a regular expression
    const regExp = new RegExp(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/
    );
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { validatePassword: true }; // Return as invalid password
    }
  }

  // Funciton to ensure passwords match
  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { matchingPasswords: true }; // Return as error: do not match
      }
    };
  }

  // Function to validate e-mail is proper format
  validateFirstName(controls) {
    // Create a regular expression
    const regExp = new RegExp(
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
    );
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { validateFirstName: true }; // Return as invalid email
    }
  }

  // Function to validate e-mail is proper format
  validateLastName(controls) {
    // Create a regular expression
    const regExp = new RegExp(
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
    );
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { validateLastName: true }; // Return as invalid email
    }
  }

  // Function to validate e-mail is proper format
  validateStreet(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^([\S\s]+?)\s+([\d-\s]*?)\s*([\w])?$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { validateStreet: true }; // Return as invalid email
    }
  }

  validateCity(controls) {
    // Create a regular expression
    const regExp = new RegExp(
      /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/
    );
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { validateCity: true }; // Return as invalid email
    }
  }

  validatePostcode(controls) {
    // Create a regular expression
    const regExp = new RegExp(/\b\d{5}\b/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { validatePostcode: true }; // Return as invalid email
    }
  }

  validateCountry(controls) {
    // Create a regular expression
    const regExp = new RegExp(
      /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/
    );
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { validateCountry: true }; // Return as invalid email
    }
  }

  validateBirthdate(controls) {
    const rawAge = moment(controls.value.formatted, 'DD.MM.YYYY');
    console.log(rawAge);
    if (rawAge) {
      const age = moment().diff(rawAge, 'years');
      console.log(age);
      if (age >= 18) {
        return null; // Return as valid email
      } else {
        return { validateBirthdate: true }; // Return as invalid email
      }
    }
  }

  // Function to submit form
  onRegisterSubmit() {
    this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
    this.formattedPhone = format(
      this.form.get('phone').value,
      'DE',
      'International'
    );
    this.disableForm(); // Disable the form
    // Create user object form user's inputs
    const user = {
      email: this.form.get('email').value, // E-mail input field
      phone: this.formattedPhone, // E-mail input field
      username: this.form.get('username').value, // Username input field
      password: this.form.get('password').value, // Password input field
      firstName: this.form.get('firstName').value, // First name input field
      lastName: this.form.get('lastName').value, // Last name input field
      street: this.form.get('street').value, // Street input field
      city: this.form.get('city').value, // City input field
      postcode: this.form.get('postcode').value, // Postcode input field
      country: this.form.get('country').value, // country input field
      birthdate: this.form.get('birthdate').value.formatted // Birthdate input field
    };

    // TODO: Mailchimp sign-up

    // Function from authentication service to register user
    this.authService.registerUser(user).subscribe(data => {
      // Resposne from registration attempt
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; // Set an error message
        this.processing = false; // Re-enable submit button
        this.enableForm(); // Re-enable form
      } else {
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = data.message; // Set a success message
        // After 2 second timeout, navigate to the login page
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirect to login view
        }, 2000);
      }
    });
  }

  // Function to check if e-mail is taken
  checkEmail() {
    // Function from authentication file to check if e-mail is taken
    this.authService
      .checkEmail(this.form.get('email').value)
      .subscribe(data => {
        // Check if success true or false was returned from API
        if (!data.success) {
          this.emailValid = false; // Return email as invalid
          this.emailMessage = data.message; // Return error message
        } else {
          this.emailValid = true; // Return email as valid
          this.emailMessage = data.message; // Return success message
        }
      });
  }

  // Function to check if username is available
  checkUsername() {
    // Function from authentication file to check if username is taken
    this.authService
      .checkUsername(this.form.get('username').value)
      .subscribe(data => {
        // Check if success true or success false was returned from API
        if (!data.success) {
          this.usernameValid = false; // Return username as invalid
          this.usernameMessage = data.message; // Return error message
        } else {
          this.usernameValid = true; // Return username as valid
          this.usernameMessage = data.message; // Return success message
        }
      });
  }

  // Function to check if username is available
  checkPhone() {
    this.formattedPhone = format(
      this.form.get('phone').value,
      'DE',
      'International'
    );
    console.log(this.formattedPhone);
    // Function from authentication file to check if username is taken
    this.authService.checkPhone(this.formattedPhone).subscribe(data => {
      // Check if success true or success false was returned from API
      if (!data.success) {
        this.phoneValid = false; // Return username as invalid
        this.phoneMessage = data.message; // Return error message
      } else {
        this.phoneValid = true; // Return username as valid
        this.phoneMessage = data.message; // Return success message
      }
    });
  }
}
