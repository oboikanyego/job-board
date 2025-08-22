import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../../services/auth';
import { Common } from '../../../services/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router,private commonService: Common) {}

  submit() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: ({ token, user }) => {
        this.auth.saveAuth(token, user);
        this.router.navigateByUrl('/');
      },
      error: (err) => 
        this.commonService.showError(err.error?.message || 'Login failed')
    });
  }
}
