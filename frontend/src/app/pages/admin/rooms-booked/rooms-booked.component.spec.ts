import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsBookedComponent } from './rooms-booked.component';

describe('RoomsBookedComponent', () => {
  let component: RoomsBookedComponent;
  let fixture: ComponentFixture<RoomsBookedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsBookedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
