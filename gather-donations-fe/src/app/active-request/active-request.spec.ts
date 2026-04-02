import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRequest } from './active-request';

describe('ActiveRequest', () => {
  let component: ActiveRequest;
  let fixture: ComponentFixture<ActiveRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveRequest],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveRequest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
