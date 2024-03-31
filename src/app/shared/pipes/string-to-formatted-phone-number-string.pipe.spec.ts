import { TestBed } from '@angular/core/testing';
import { StringToFormattedPhoneNumberStringPipe } from './string-to-formatted-phone-number-string.pipe';

describe('StringToFormattedPhoneNumberStringPipe', () => {
  let pipe: StringToFormattedPhoneNumberStringPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pipe = new StringToFormattedPhoneNumberStringPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
