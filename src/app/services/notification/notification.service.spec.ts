import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationsService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers:[ NotificationService ],
    }).compileComponents()
    service = TestBed.inject(NotificationService);
  });

  afterEach(() => {
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
