import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietaireRegisterComponent } from './proprietaire-register.component';

describe('ProprietaireRegisterComponent', () => {
  let component: ProprietaireRegisterComponent;
  let fixture: ComponentFixture<ProprietaireRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprietaireRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietaireRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
