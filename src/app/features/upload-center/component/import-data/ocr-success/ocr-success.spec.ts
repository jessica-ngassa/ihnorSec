import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrSuccess } from './ocr-success';

describe('OcrSuccess', () => {
  let component: OcrSuccess;
  let fixture: ComponentFixture<OcrSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcrSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcrSuccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
