import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudDetail } from './fraud-detail';

describe('FraudDetail', () => {
  let component: FraudDetail;
  let fixture: ComponentFixture<FraudDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraudDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraudDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
