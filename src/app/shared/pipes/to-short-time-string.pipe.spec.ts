import { TestBed } from '@angular/core/testing';
import { ToShortTimeStringPipe } from './to-short-time-string.pipe';

describe('ToShortTimeStringPipe', () => {
  let pipe: ToShortTimeStringPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pipe = new ToShortTimeStringPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
