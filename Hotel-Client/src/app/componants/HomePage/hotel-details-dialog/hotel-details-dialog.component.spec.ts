import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetailsDialogComponent } from './hotel-details-dialog.component';

describe('HotelDetailsDialogComponent', () => {
  let component: HotelDetailsDialogComponent;
  let fixture: ComponentFixture<HotelDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
