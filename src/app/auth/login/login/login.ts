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
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  email = '';
  password = '';
  loading: boolean | undefined;
  loginForm!: FormGroup;
  showPassword: boolean = false;

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
        this.router.navigateByUrl('/jobs');
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
      .then(async (res) => {
        const idToken = await res.user.getIdToken();

        // Send it to your backend → backend verifies it with Firebase
        this.auth.loginWithFirebase({ token: idToken }).subscribe({
          next: ({ token, user }) => {
            this.auth.saveAuth(token, user); // store JWT from your backend
            this.router.navigate(['/']);
          },
          error: (err) => {
            this.commonService.showError(
              err.error?.message || 'Firebase login failed'
            );
          },
        });
      })
      .catch((err) => {
        this.commonService.showError(err.message || 'Firebase login failed');
      })
      .finally(() => (this.loading = false));
  }
}
