import { TestBed } from '@angular/core/testing';
import { AppStateService } from './app-state.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AppStateService', () => {
  let service: AppStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ SharedModule ],
      providers:[ AppStateService, MatDialog ],
    }).compileComponents();
    service = TestBed.inject(AppStateService);
  });

  afterEach(() => {
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
