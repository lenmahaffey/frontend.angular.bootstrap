import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUserComponent } from './edit-user.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from '../user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, RouterModule, convertToParamMap } from '@angular/router';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: UserService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ HttpClientTestingModule, SharedModule, RouterModule ],
      providers:[ UserService,
        { provide:  ActivatedRoute, useValue:{
          snapshot: {
            paramMap: convertToParamMap({ id: '123' }) // Mocking route parameter
        } } }
      ],
    }).compileComponents().then(() =>
    {
      httpTestingController = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
      service = TestBed.inject(UserService);
      route = TestBed.inject(ActivatedRoute)
      fixture = TestBed.createComponent(EditUserComponent);
      component = fixture.componentInstance;
    });
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    httpTestingController.expectOne('http://localhost:5001/user/getuser/123');
  });
});
