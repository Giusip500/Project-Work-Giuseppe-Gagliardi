import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from '../../../utility/navbar/navbar.component';
import { FooterComponent } from '../../../utility/footer/footer.component';

@Component({
  selector: 'app-meeting',
  imports: [
    FormsModule, 
    InputTextModule, 
    ButtonModule, 
    CardModule, 
    CommonModule, 
    TranslateModule, 
    NavbarComponent, 
    FooterComponent
  ],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent {
  
}
