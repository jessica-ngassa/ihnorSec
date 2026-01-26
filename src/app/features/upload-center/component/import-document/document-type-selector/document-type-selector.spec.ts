import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeSelector } from './document-type-selector';

describe('DocumentTypeSelector', () => {
  let component: DocumentTypeSelector;
  let fixture: ComponentFixture<DocumentTypeSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentTypeSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTypeSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
