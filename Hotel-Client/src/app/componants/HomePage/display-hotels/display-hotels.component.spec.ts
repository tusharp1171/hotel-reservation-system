import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHotelsComponent } from './display-hotels.component';

describe('DisplayHotelsComponent', () => {
  let component: DisplayHotelsComponent;
  let fixture: ComponentFixture<DisplayHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayHotelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
