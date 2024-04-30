import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadesMapComponent } from './stades-map.component';

describe('StadesMapComponent', () => {
  let component: StadesMapComponent;
  let fixture: ComponentFixture<StadesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StadesMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StadesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
