import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomaliesTimeChart } from './anomalies-time-chart';

describe('AnomaliesTimeChart', () => {
  let component: AnomaliesTimeChart;
  let fixture: ComponentFixture<AnomaliesTimeChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnomaliesTimeChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnomaliesTimeChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
