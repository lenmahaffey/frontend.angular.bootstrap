import { PhoneNumberToFormattedStringPipe } from './phone-number-to-formatted-string.pipe';

describe('PhoneNumberToFormattedStringPipe', () => {
  let pipe: PhoneNumberToFormattedStringPipe;

  beforeEach(() => {
    pipe = new PhoneNumberToFormattedStringPipe();
  });

  afterEach(() => {
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
