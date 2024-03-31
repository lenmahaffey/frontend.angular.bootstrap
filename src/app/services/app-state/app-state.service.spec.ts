import { TestBed } from '@angular/core/testing';
import { AppStateService } from './app-state.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AppStateService', () => {
  let service: AppStateService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers:[ AppStateService, MatDialog ],
    });
    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AppStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
