import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from '../../contact.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompetitorContactsComponent } from './competitor-contacts.component';

describe('CompetitorContactsComponent', () => {
  let component: CompetitorContactsComponent;
  let fixture: ComponentFixture<CompetitorContactsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ContactService

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers:[],
    }).compileComponents().then(() =>
    {
      httpTestingController = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
      service = TestBed.inject(ContactService)
      fixture = TestBed.createComponent(CompetitorContactsComponent);
      component = fixture.componentInstance;
    });
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
