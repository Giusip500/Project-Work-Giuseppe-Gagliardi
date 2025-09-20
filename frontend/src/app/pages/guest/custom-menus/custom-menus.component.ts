import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-menus',
  imports: [CommonModule, HttpClientModule, TranslateModule],
  templateUrl: './custom-menus.component.html',
  styleUrl: './custom-menus.component.css'
})
export class CustomMenusComponent implements OnInit {
  menus: any[] = [];
  private currentLanguage: string = 'en';

  constructor(
    private http: HttpClient, 
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
    
    this.loadCustomMenus();

    this.translate.onLangChange.subscribe((event: any) => {
      this.currentLanguage = event.lang;
      this.loadCustomMenus();
    });
  }

  private loadCustomMenus(): void {
    const userId = Number(localStorage.getItem('id') || '0');
    
    this.http.get<any[]>(`http://localhost:8080/api/custom-menu/user/${userId}?lang=${this.currentLanguage}`).subscribe({
      next: data => this.menus = data,
      error: error => {
        console.error('Error loading custom menus:', error);
        alert('Error loading custom menus');
      }
    });
  }
}
