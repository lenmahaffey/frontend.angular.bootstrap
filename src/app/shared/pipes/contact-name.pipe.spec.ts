import { ContactNamePipe } from './contact-name.pipe';

describe('ContactNamePipe', () => {
  let pipe: ContactNamePipe;

  beforeEach(() => {
    pipe = new ContactNamePipe();
  });

  afterEach(() => {
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
