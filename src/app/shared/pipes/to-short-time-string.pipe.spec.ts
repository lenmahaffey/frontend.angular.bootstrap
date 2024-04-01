import { ToShortTimeStringPipe } from './to-short-time-string.pipe';

describe('ToShortTimeStringPipe', () => {
  let pipe: ToShortTimeStringPipe;

  beforeEach(() => {
    pipe = new ToShortTimeStringPipe();
  });

  afterEach(() => {
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
