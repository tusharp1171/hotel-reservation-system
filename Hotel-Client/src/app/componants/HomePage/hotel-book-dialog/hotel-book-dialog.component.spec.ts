import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBookDialogComponent } from './hotel-book-dialog.component';

describe('HotelBookDialogComponent', () => {
  let component: HotelBookDialogComponent;
  let fixture: ComponentFixture<HotelBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelBookDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
