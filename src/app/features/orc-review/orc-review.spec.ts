import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcReview } from './orc-review';

describe('OrcReview', () => {
  let component: OrcReview;
  let fixture: ComponentFixture<OrcReview>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
