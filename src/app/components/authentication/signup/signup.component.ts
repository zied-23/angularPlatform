import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Student, User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  User: User = new User();
  phoneNumberForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  signup(form: NgForm) {
    if (form.valid) {
      const { username, email, password, phone, fullname, role } = form.value;

      this.authService
        .signup(username, email, password, phone, fullname, role)
        .subscribe(
          (response) => {
            // Handle successful signup
            console.log(response);
          },
          (error) => {
            // Handle signup error
            console.error(error);
          }
        );
    }
  }
  phoneNumber: string = '';

  /*onPhoneNumberInputChange() {
    let phoneNumberWithoutHyphens = this.phoneNumber.replace(/-/g, '');

    if (
      phoneNumberWithoutHyphens.length >= 2 &&
      phoneNumberWithoutHyphens.length < 5
    ) {
      phoneNumberWithoutHyphens =
        phoneNumberWithoutHyphens.slice(0, 2) +
        '-' +
        phoneNumberWithoutHyphens.slice(2);
    } else if (phoneNumberWithoutHyphens.length >= 5) {
      phoneNumberWithoutHyphens =
        phoneNumberWithoutHyphens.slice(0, 2) +
        '-' +
        phoneNumberWithoutHyphens.slice(2, 5) +
        '-' +
        phoneNumberWithoutHyphens.slice(5);
    }

    this.phoneNumber = phoneNumberWithoutHyphens;
  }*/

  onSubmit() {
    // const phoneNumber = this.phoneNumber.replace(/-/g, '');
  }
  ngOnInit() {
    /*   this.phoneNumberForm = this.formBuilder.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]{8}'),
          Validators.maxLength(8),
        ],
      ],
    });
  */
  }
}
