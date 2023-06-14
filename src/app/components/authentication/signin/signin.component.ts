import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.signin(username, password).subscribe(
      (response) => {
        localStorage.setItem('token', response.body.accessToken);
        const roles = response.body.roles;
        this.router.navigate(['/']);
        if (this.authService.hasRole('ROLE_ADMIN')) {
          this.router.navigate(['/dashboard']);
        } else if (
          this.authService.hasAnyRole(['ROLE_STUDENT', 'ROLE_COACH'])
        ) {
          this.router.navigate(['/home']);
        } else {
        }
        console.log(
          'login Success ' +
            response.body.username +
            response.body.roles +
            response.body.accessToken
        );
      },
      (error) => {
        this.errorMessage = error.message;
        console.log('Login Error:', error);
      }
    );
  }
}
