import { StringToPhoneNumberPipe } from './string-to-phone-number.pipe';

describe('StringToPhoneNumberPipe', () => {
  let pipe: StringToPhoneNumberPipe;

  beforeEach(() => {
    pipe = new StringToPhoneNumberPipe();
  });

  afterEach(() => {
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
