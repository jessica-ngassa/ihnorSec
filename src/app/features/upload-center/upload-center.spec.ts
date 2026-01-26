import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCenter } from './upload-center';

describe('UploadCenter', () => {
  let component: UploadCenter;
  let fixture: ComponentFixture<UploadCenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadCenter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCenter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
