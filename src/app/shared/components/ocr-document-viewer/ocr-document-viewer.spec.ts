import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrDocumentViewer } from './ocr-document-viewer';

describe('OcrDocumentViewer', () => {
  let component: OcrDocumentViewer;
  let fixture: ComponentFixture<OcrDocumentViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcrDocumentViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcrDocumentViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
