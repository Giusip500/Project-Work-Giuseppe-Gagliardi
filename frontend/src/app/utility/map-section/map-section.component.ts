import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map-section',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  template: `
    <section class="map-container">
      <google-map [height]="'400px'" [width]="'100%'" [center]="center" [zoom]="15">
        <map-marker [position]="center"></map-marker>
      </google-map>
    </section>
  `,
  styles: [`
    .map-container {
      padding: 2rem;
      text-align: center;
      background-color: transparent;
    }
  `]
})
export class MapSectionComponent {
  center = { lat: 45.411017, lng: 11.872177 };
}
