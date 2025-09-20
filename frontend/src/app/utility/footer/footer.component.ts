import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-section footer-info">
          <div class="footer-details">
            <p>Corso Milano, 36, 35139 Padova PD</p>
            <p>GPS: 45°24'34.6"N 11°52'11.8"E</p>
            <p>{{ 'FOOTER.PHONE' | translate }}: <a href="tel:+39123456789">+39 123 456 789</a></p>
            <p>Email: <a href="mailto:info@lumora.com">info&#64;lumora.com</a></p>
            <p>Fax: +39 123 456 789</p>
          </div>
        </div>
        <div class="footer-section footer-logo">
          <img src="assets/logo.png" alt="Logo" class="footer-logo-img" />
        </div>
        <div class="footer-section footer-social">
          <h4>{{ 'FOOTER.FOLLOW_US' | translate }}</h4>
          <div class="social-links">
            <a href="https://www.instagram.com" aria-label="Instagram" class="social-icon instagram" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="https://www.facebook.com" aria-label="Facebook" class="social-icon facebook" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="https://www.linkedin.com" aria-label="LinkedIn" class="social-icon linkedin" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="https://www.twitter.com" aria-label="Twitter" class="social-icon twitter" target="_blank"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(180deg, rgb(85, 60, 20), rgb(85, 60, 40));
      color: rgb(225, 225, 225);
      padding: 3rem 1.5rem;
      margin-top: 5rem;
    }

    .footer-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-section {
      text-align: center;
      width: 100%;
      max-width: 350px;
    }

    .footer-info p {
      font-size: 1rem;
      margin: 0.5rem;
    }
    .footer-info a {
      color: rgb(225, 225, 225);
      text-decoration: underline;
    }

    .footer-logo-img {
      max-width: 200px;
    }

    .footer-social h4 {
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .social-links {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .social-icon {
      font-size: 1.8rem;
      color: rgb(225, 225, 225);
      transition: transform 0.3s, color 0.3s;
    }
    .social-icon:hover {
      transform: scale(1.1);
    }

    .social-icon.instagram:hover {
      color: rgb(225, 50, 100);
    }
    .social-icon.facebook:hover {
      color: rgb(50, 85, 150);
    }
    .social-icon.linkedin:hover {
      color: rgb(0, 125, 180);
    }
    .social-icon.twitter:hover {
      color: rgb(30, 160, 245);
    }

    @media (min-width: 775px) {
      .footer-inner {
        flex-direction: row;
        flex-wrap: wrap;
        text-align: center;
        gap: 3rem;
      }

      .footer-section {
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {

}
