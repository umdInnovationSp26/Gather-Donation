import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDonations } from './post-donations';

describe('PostDonations', () => {
  let component: PostDonations;
  let fixture: ComponentFixture<PostDonations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDonations],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDonations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
