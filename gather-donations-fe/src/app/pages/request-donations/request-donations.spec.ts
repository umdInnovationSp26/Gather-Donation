import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDonations } from './request-donations';

describe('RequestDonations', () => {
  let component: RequestDonations;
  let fixture: ComponentFixture<RequestDonations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDonations],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestDonations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
