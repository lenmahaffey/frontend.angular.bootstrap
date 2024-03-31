import { TestBed } from '@angular/core/testing';
import { ToShortDateStringPipe } from './to-short-date-string.pipe';

describe('ToShortDateStringPipe', () => {
  let pipe: ToShortDateStringPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pipe = new ToShortDateStringPipe(navigator.language);
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
