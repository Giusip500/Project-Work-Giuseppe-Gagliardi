import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavigationStart, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Dish } from '../../../models/dish';
import { Subscription } from 'rxjs';
import { NavbarComponent } from '../../../utility/navbar/navbar.component';
import { FooterComponent } from '../../../utility/footer/footer.component';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HttpClientModule,
    InputTextModule, ButtonModule, CardModule,
    CheckboxModule, TranslateModule, DatePickerModule,
    SelectModule, NavbarComponent, FooterComponent
  ],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit {
  showselect: boolean = false;

  images = ['assets/restaurant-page/restaurant1.jpg', 'assets/restaurant-page/restaurant2.jpg', 'assets/restaurant-page/restaurant3.jpg'];
  currentImageIndex = 0;
  intervalId: any;

  menu: Dish[] = [];
  filteredMenu: { [key: string]: Dish[] } = {};
  menuTypes: string[] = [];
  showMenu = false;

  showCustomMenuSection = false;
  intolerances = ['Lactose', 'Gluten', 'Fructose', 'Histamine', 'Sorbitol', 'Nickel', 'Eggs', 'Soy', 'Yeast', 'Sulphites'];
  selectedIntolerances: string[] = [];
  mealType!: string;
  selectedDate: Date = new Date();
  generatedMenu: Dish[] = [];
  menuConfirmed = false;

  mealOptions = [
    { label: 'Lunch', value: 'Lunch' },
    { label: 'Dinner', value: 'Dinner' }
  ];

  private routerSubscription!: Subscription;
  private currentLanguage: string = 'en';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Get current language from localStorage or default to 'en'
    this.currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 5000);

    this.initializeMealOptions();
    this.loadMenu();

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.resetCustomMenu();
      }
    });

    this.translate.onLangChange.subscribe((event: any) => {
      this.currentLanguage = event.lang;
      this.initializeMealOptions();
      this.loadMenu();
    });
  }

  private loadMenu(): void {
    this.http.get<Dish[]>(`http://localhost:8080/api/menu?lang=${this.currentLanguage}`).subscribe(data => {
      this.menu = data;

      this.filteredMenu = this.menu.reduce((acc, dish) => {
        if (!acc[dish.type]) acc[dish.type] = [];
        acc[dish.type].push(dish);
        return acc;
      }, {} as { [key: string]: Dish[] });

      this.menuTypes = Object.keys(this.filteredMenu);
    });
  }

  private initializeMealOptions(): void {
    this.mealOptions = [
      { 
        label: this.translate.instant('RESTAURANT.MEALS.LUNCH'), 
        value: 'Lunch' 
      },
      { 
        label: this.translate.instant('RESTAURANT.MEALS.DINNER'), 
        value: 'Dinner' 
      }
    ];
  }

  getIntoleranceTranslation(intolerance: string): string {
    const translationKey = `RESTAURANT.INTOLERANCES.${intolerance.toUpperCase()}`;
    return translationKey;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleCustomMenu() {
    this.showCustomMenuSection = !this.showCustomMenuSection;
  }

  onIntoleranceChange(event: any) {
    const value = event.value;
    const isChecked = event.checked;

    if (isChecked) {
      if (!this.selectedIntolerances.includes(value)) {
        this.selectedIntolerances.push(value);
      }
    } else {
      this.selectedIntolerances = this.selectedIntolerances.filter(i => i !== value);
    }
  }

  generateMenu() {
    const payload = {
      intolerances: this.selectedIntolerances,
      mealType: this.mealType,
      date: this.selectedDate,
      userId: Number(localStorage.getItem('id'))
    };

    this.http.post<any>(`http://localhost:8080/api/custom-menu/generate?lang=${this.currentLanguage}`, payload)
      .subscribe(response => {
        this.generatedMenu = response.recommendedDishes;
        this.menuConfirmed = false;
      });
  }

  confirmMenu() {
    const confirmed = {
      userId: Number(localStorage.getItem('id')),
      dishIds: this.generatedMenu.map(d => d.id),
      type: this.mealType,
      date: this.selectedDate
    };

    console.log('Confirming menu:', confirmed);

    this.http.post(`http://localhost:8080/api/custom-menu/confirm?lang=${this.currentLanguage}`, confirmed)
      .subscribe(() => {
        this.menuConfirmed = true;
      });
  }

  resetCustomMenu() {
    this.generatedMenu = [];
    this.selectedIntolerances = [];
    this.selectedDate = new Date();
    this.mealType = '';
    this.menuConfirmed = false;
  }
}
