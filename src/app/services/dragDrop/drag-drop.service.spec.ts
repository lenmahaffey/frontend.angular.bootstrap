import { TestBed } from '@angular/core/testing';
import { DragDropService } from './drag-drop.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AppStateService } from '../app-state/app-state.service';

describe('DragDropsService', () => {
  let service: DragDropService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ HttpClientTestingModule ],
      providers:[ DragDropService ],
    });
    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DragDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
