import { TestBed } from '@angular/core/testing';
import { CurrencyFormatterPipe } from './currency-formatter.pipe';

describe('CurrencyFormatterPipe', () => {
  let pipe: CurrencyFormatterPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pipe = new CurrencyFormatterPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
