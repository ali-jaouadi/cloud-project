import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietaireStadesComponent } from './proprietaire-stades.component';

describe('ProprietaireStadesComponent', () => {
  let component: ProprietaireStadesComponent;
  let fixture: ComponentFixture<ProprietaireStadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprietaireStadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietaireStadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
