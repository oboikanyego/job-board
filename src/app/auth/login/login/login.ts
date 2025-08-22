import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../../services/auth';
import { Common } from '../../../services/common';
import { FirebaseAuthService } from '../../../services/firebase-auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  email = '';
  password = '';
  loading: boolean | undefined;
  loginForm!: FormGroup;

  constructor(
    private auth: Auth,
    private fb: FormBuilder,
    private router: Router,
    private commonService: Common,
    private firebaseAuth: FirebaseAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.auth.login({ email: email, password: password }).subscribe({
      next: ({ token, user }) => {
        this.auth.saveAuth(token, user);
        this.router.navigateByUrl('/');
      },
      error: (err) =>
        this.commonService.showError(err.error?.message || 'Login failed'),
    });
  }

  // Login using Firebase Google sign-in
  loginFirebase() {
    this.loading = true;
    this.firebaseAuth
      .loginWithGoogle()
      .then((res) => {
        // res.user contains Firebase user info
        // optionally send to your backend to get JWT
        this.commonService.showError('Firebase login successful!');
        this.router.navigate(['/']); // redirect after login
      })
      .catch((err) => {
        this.commonService.showError(err.message || 'Firebase login failed');
      })
      .finally(() => (this.loading = false));
  }
}
