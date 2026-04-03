import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRequests } from './active-requests';

describe('ActiveRequests', () => {
  let component: ActiveRequests;
  let fixture: ComponentFixture<ActiveRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveRequests],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveRequests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
