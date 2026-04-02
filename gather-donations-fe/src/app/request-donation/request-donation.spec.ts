import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDonation } from './request-donation';

describe('RequestDonation', () => {
  let component: RequestDonation;
  let fixture: ComponentFixture<RequestDonation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDonation],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestDonation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
