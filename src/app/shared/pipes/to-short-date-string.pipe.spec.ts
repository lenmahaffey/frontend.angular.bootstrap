import { ToShortDateStringPipe } from './to-short-date-string.pipe';

describe('ToShortDateStringPipe', () => {
  let pipe: ToShortDateStringPipe;

  beforeEach(() => {
    pipe = new ToShortDateStringPipe(navigator.language);
  });

  afterEach(() => {
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
