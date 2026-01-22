import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fraud } from './fraud';

describe('Fraud', () => {
  let component: Fraud;
  let fixture: ComponentFixture<Fraud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fraud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fraud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
