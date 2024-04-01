import { CurrencyFormatterPipe } from './currency-formatter.pipe';

describe('CurrencyFormatterPipe', () => {
  let pipe: CurrencyFormatterPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatterPipe();
  });

  afterEach(() => {
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
