import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSummary } from './profile-summary';

describe('ProfileSummary', () => {
  let component: ProfileSummary;
  let fixture: ComponentFixture<ProfileSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
