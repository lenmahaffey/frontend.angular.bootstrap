import { StringToFormattedPhoneNumberStringPipe } from './string-to-formatted-phone-number-string.pipe';

describe('StringToFormattedPhoneNumberStringPipe', () => {
  let pipe: StringToFormattedPhoneNumberStringPipe;

  beforeEach(() => {
    pipe = new StringToFormattedPhoneNumberStringPipe();
  });

  afterEach(() => {
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
