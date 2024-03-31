import { TestBed } from '@angular/core/testing';
import { ContactNamePipe } from './contact-name.pipe';

describe('ContactNamePipe', () => {
  let pipe: ContactNamePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pipe = new ContactNamePipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
