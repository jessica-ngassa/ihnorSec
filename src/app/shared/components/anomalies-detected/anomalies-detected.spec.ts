import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomaliesDetected } from './anomalies-detected';

describe('AnomaliesDetected', () => {
  let component: AnomaliesDetected;
  let fixture: ComponentFixture<AnomaliesDetected>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnomaliesDetected]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnomaliesDetected);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
