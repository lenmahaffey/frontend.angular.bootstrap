import { TestBed } from '@angular/core/testing';

import { EventsService } from './events.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactService } from '../contacts/contact.service';

describe('EventsService', () => {
  let service: EventsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ HttpClientTestingModule ],
      providers:[ ContactService ],
    });
    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
