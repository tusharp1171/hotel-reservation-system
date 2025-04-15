import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsdisplayComponent } from './roomsdisplay.component';

describe('RoomsdisplayComponent', () => {
  let component: RoomsdisplayComponent;
  let fixture: ComponentFixture<RoomsdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsdisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
