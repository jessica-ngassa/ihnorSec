import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudScoreChart } from './fraud-score-chart';

describe('FraudScoreChart', () => {
  let component: FraudScoreChart;
  let fixture: ComponentFixture<FraudScoreChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraudScoreChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraudScoreChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
