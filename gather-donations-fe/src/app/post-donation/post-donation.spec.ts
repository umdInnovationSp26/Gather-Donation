import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDonation } from './post-donation';

describe('PostDonation', () => {
  let component: PostDonation;
  let fixture: ComponentFixture<PostDonation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDonation],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDonation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
