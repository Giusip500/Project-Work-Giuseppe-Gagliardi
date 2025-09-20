import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, CardModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Credenziali utente per il login
  email = '';
  password = '';

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private translate: TranslateService
  ) {}

  login() {
    const currentLang = this.translate.currentLang || 'en';
    
    this.http.post<any>('http://localhost:8080/api/users/login', {
      email: this.email,
      password: this.password,
    }, {
      params: { lang: currentLang }
    }).subscribe({
      next: (response) => {
        // Salva i dati utente nel localStorage per persistenza della sessione
        localStorage.setItem('id', response.id);
        localStorage.setItem('email', this.email);
        localStorage.setItem('username', response.username);
        localStorage.setItem('avatar', response.avatar);
        localStorage.setItem('role', response.role);
        
        // Routing condizionale basato sul ruolo utente
        if (response.role == 'Guest') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/admin-home']);
        }
      }, 
      error: (error) => {
        const errorMessage = error.error?.error || 'Wrong email or password';
        alert(errorMessage);
      }
    });
  }
  
  signIn() {
    this.router.navigate(['/signIn']);
  }
}
