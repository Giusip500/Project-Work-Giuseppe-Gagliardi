import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMenusComponent } from './custom-menus.component';

describe('CustomMenusComponent', () => {
  let component: CustomMenusComponent;
  let fixture: ComponentFixture<CustomMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomMenusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
