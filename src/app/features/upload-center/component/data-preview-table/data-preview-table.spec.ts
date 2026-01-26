import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPreviewTable } from './data-preview-table';

describe('DataPreviewTable', () => {
  let component: DataPreviewTable;
  let fixture: ComponentFixture<DataPreviewTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataPreviewTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPreviewTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
