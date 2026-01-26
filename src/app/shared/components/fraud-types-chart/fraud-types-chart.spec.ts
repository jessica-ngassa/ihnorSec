import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudTypesChart } from './fraud-types-chart';

describe('FraudTypesChart', () => {
  let component: FraudTypesChart;
  let fixture: ComponentFixture<FraudTypesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraudTypesChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraudTypesChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
