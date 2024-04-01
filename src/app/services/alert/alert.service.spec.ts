import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';

describe('AlertsService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers:[ AlertService ],
    }).compileComponents();
    service = TestBed.inject(AlertService);
  });

  afterEach(() => {
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
