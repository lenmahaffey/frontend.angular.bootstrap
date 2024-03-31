import { TestBed } from '@angular/core/testing';
import { PhoneNumberToFormattedStringPipe } from './phone-number-to-formatted-string.pipe';

describe('PhoneNumberToFormattedStringPipe', () => {
  let pipe: PhoneNumberToFormattedStringPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pipe = new PhoneNumberToFormattedStringPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
