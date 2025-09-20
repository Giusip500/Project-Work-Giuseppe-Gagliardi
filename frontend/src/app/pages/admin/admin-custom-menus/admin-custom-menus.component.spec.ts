import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomMenusComponent } from './admin-custom-menus.component';

describe('AdminCustomMenusComponent', () => {
  let component: AdminCustomMenusComponent;
  let fixture: ComponentFixture<AdminCustomMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCustomMenusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCustomMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
