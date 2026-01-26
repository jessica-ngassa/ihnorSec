import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsApplication } from './sectors-application';

describe('SectorsApplication', () => {
  let component: SectorsApplication;
  let fixture: ComponentFixture<SectorsApplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectorsApplication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectorsApplication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
