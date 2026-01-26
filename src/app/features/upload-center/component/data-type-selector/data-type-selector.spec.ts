import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypeSelector } from './data-type-selector';

describe('DataTypeSelector', () => {
  let component: DataTypeSelector;
  let fixture: ComponentFixture<DataTypeSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTypeSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTypeSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
