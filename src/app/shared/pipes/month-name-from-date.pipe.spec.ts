import { MonthNameFromDatePipe } from './month-name-from-date.pipe';

describe('MonthNameFromDatePipe', () => {
  let pipe: MonthNameFromDatePipe;

  beforeEach(() => {
    pipe = new MonthNameFromDatePipe();
  });

  afterEach(() => {
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
