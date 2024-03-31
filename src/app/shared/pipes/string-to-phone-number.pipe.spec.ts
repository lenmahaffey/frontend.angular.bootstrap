import { TestBed } from '@angular/core/testing';
import { StringToPhoneNumberPipe } from './string-to-phone-number.pipe';

describe('StringToPhoneNumberPipe', () => {
  let pipe: StringToPhoneNumberPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pipe = new StringToPhoneNumberPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
