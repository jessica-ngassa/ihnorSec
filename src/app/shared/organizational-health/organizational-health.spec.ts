import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationalHealth } from './organizational-health';

describe('OrganizationalHealth', () => {
  let component: OrganizationalHealth;
  let fixture: ComponentFixture<OrganizationalHealth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationalHealth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationalHealth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
