import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, CardModule, TranslateModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  // Dati profilo utente
  username = '';
  email = '';
  // Gestione avatar
  avatarPreview: string | null = null;  
  avatarIsChanged = false;              
  usernameExists = false;               
  // Sezione cambio password
  showPasswordSection = false;          
  oldPassword = '';                     
  newPassword = '';                     
  confirmPassword = '';                 
  currentPasswordValidation = false;    

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.email = localStorage.getItem('email') || '';
    this.avatarPreview = localStorage.getItem('avatar');
  }

  avatarChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    this.avatarIsChanged = true;
  }

  triggerFileInput() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLElement;
    if (fileInput) fileInput.click();
  }

  togglePasswordSection() {
    this.showPasswordSection = !this.showPasswordSection;
    if (!this.showPasswordSection) {
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }

  save() {
    const updatedUser: any = { username: this.username };
    const currentLang = this.translate.currentLang || 'en';
  
    if (this.showPasswordSection) {
      if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
        alert('All password fields must be filled');
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        alert("New passwords don't match");
        return;
      }
      
      this.http.put<any>(`http://localhost:8080/api/users/update-password/${this.email}`, {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }, {
        params: { lang: currentLang }
      }).subscribe({
        next: (response) => {
          alert(response.message || 'Password updated successfully');
          this.updateUserProfile(updatedUser);
        },
        error: (error) => {
          const errorMessage = error.error?.error || 'Old password is incorrect';
          alert(errorMessage);
        }
      });
      return;
    }
    this.updateUserProfile(updatedUser);
  }
  
  private updateUserProfile(updatedUser: any) {
    const currentLang = this.translate.currentLang || 'en';
    
    if (this.avatarIsChanged && this.avatarPreview) {
      updatedUser.avatar = this.avatarPreview;
    }
  
    this.http.put<any>(`http://localhost:8080/api/users/${this.email}`, updatedUser, {
      params: { lang: currentLang }
    }).subscribe({
      next: (response) => {
        if (response.avatar) {
          localStorage.setItem('avatar', response.avatar);
        }
        localStorage.setItem('username', this.username);
        
        alert(response.message || 'Profile updated successfully');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        const errorMessage = error.error?.error || 'Error updating profile';
        alert(errorMessage);
      }
    });
  }

  confirmDelete() {
    Swal.fire({
      title: this.translate.instant('PROFILE.CONFIRM_DELETE.TITLE'),
      text: this.translate.instant('PROFILE.CONFIRM_DELETE.TEXT'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3095d6',    
      confirmButtonText: this.translate.instant('PROFILE.CONFIRM_DELETE.CONFIRM_BUTTON_TEXT'),
      cancelButtonText: this.translate.instant('PROFILE.CONFIRM_DELETE.CONFIRM_BUTTON_CANCEL')
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete();
        Swal.fire(
          this.translate.instant('PROFILE.CONFIRM_DELETE.RESULT_TITLE'), 
          this.translate.instant('PROFILE.CONFIRM_DELETE.RESULT_HTML'), 
          'success'
        );
      }
    });
  }

  delete() {
    const currentLang = this.translate.currentLang || 'en';
    
    this.http.delete<any>(`http://localhost:8080/api/users/${this.email}`, {
      params: { lang: currentLang }
    }).subscribe({
      next: (response) => {
        alert(response.message || 'Profile deleted successfully');
        localStorage.clear();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error deleting profile:', error);
        const errorMessage = error.error?.error || 'Error deleting profile';
        alert(errorMessage);
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  checkUsernameExists() {
    if (this.username != localStorage.getItem('username')) {
      if (this.username.trim()) {
        this.http.get<boolean>('http://localhost:8080/api/users/exists/username', {
        params: { username: this.username }
        }).subscribe((exists) => {
          this.usernameExists = exists;
        });
      }
    }
  }
}
