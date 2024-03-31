import { TestBed } from '@angular/core/testing';
import { MonthNameFromDatePipe } from './month-name-from-date.pipe';

describe('MonthNameFromDatePipe', () => {
  let pipe: MonthNameFromDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pipe = new MonthNameFromDatePipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
