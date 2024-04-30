import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadeMapComponent } from './stade-map.component';

describe('StadeMapComponent', () => {
  let component: StadeMapComponent;
  let fixture: ComponentFixture<StadeMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StadeMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StadeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
