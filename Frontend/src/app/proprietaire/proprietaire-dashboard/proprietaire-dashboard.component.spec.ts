import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietaireDashboardComponent } from './proprietaire-dashboard.component';

describe('ProprietaireDashboardComponent', () => {
  let component: ProprietaireDashboardComponent;
  let fixture: ComponentFixture<ProprietaireDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprietaireDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietaireDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
