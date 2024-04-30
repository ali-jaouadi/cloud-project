import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietaireReservationsComponent } from './proprietaire-reservations.component';

describe('ProprietaireReservationsComponent', () => {
  let component: ProprietaireReservationsComponent;
  let fixture: ComponentFixture<ProprietaireReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprietaireReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietaireReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
