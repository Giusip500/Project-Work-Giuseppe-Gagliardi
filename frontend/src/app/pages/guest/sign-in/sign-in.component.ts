import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signIn',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, CardModule, CommonModule, HttpClientModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = 'Guest';
  // checks for username and email
  emailExists = false;
  usernameExists = false;

  constructor(private http: HttpClient, private router: Router, private translate: TranslateService) {}

  signIn() {
    if (this.password !== this.confirmPassword) {
    alert("The passwords don't match");
    return;
    }
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
        alert("Some fields are empty");
        return;
    }
    if (this.emailExists || this.usernameExists) {
        alert("Please fix the issues before submitting.");
        return;
    }

    const currentLang = this.translate.currentLang || 'en';

    this.http.post<any>('http://localhost:8080/api/users', {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role,
    }, {
        params: { lang: currentLang }
    }).subscribe({
        next: (response) => {
            localStorage.setItem('id', response.user.id);
            localStorage.setItem('email', this.email);
            localStorage.setItem('username', this.username);
            localStorage.setItem('role', this.role);
            this.router.navigate(['/home']);
        },
        error: (error) => {
            const errorMessage = error.error?.error || error.message || 'SignIn error';
            alert(errorMessage);
        }
    });
  }

  checkEmailExists() {
  if (this.email.trim()) {
      this.http.get<boolean>('http://localhost:8080/api/users/exists/email', {
      params: { email: this.email }
      }).subscribe((exists) => {
      this.emailExists = exists;
      });
    }
  }

  checkUsernameExists() {
  if (this.username.trim()) {
      this.http.get<boolean>('http://localhost:8080/api/users/exists/username', {
      params: { username: this.username }
      }).subscribe((exists) => {
      this.usernameExists = exists;
      });
    }
  }
}
