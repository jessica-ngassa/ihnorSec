import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnMapping } from './column-mapping';

describe('ColumnMapping', () => {
  let component: ColumnMapping;
  let fixture: ComponentFixture<ColumnMapping>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnMapping]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnMapping);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
