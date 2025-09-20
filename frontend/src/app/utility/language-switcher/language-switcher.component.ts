import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="flag-switcher">
      <img src="assets/flags/it.svg" alt="Italiano" title="Italiano" (click)="switchTo('it')" [class.active]="currentLanguage === 'it'" />
      <img src="assets/flags/us.svg" alt="English" title="English" (click)="switchTo('en')" [class.active]="currentLanguage === 'en'"/>
    </div>
  `,
  styles: [`
    .flag-switcher {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      align-items: center;
    }

    .flag-switcher img {
      width: 32px;
      height: 24px;
      cursor: pointer;
      border-radius: 5px;
      opacity: 0.6;
      transition: opacity 0.3s ease, transform 0.2s ease;
      border: 2px solid transparent;
    }

    .flag-switcher img:hover {
      opacity: 1;
      transform: scale(1.05);
    }
  `]
})
export class LanguageSwitcherComponent {
  currentLanguage = 'en';

  constructor(private translate: TranslateService) {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    this.currentLanguage = savedLanguage ? savedLanguage : 'en';
    this.translate.setDefaultLang(this.currentLanguage);
    this.translate.use(this.currentLanguage);
  }

  switchTo(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
    localStorage.setItem('preferredLanguage', language);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
  }
}
