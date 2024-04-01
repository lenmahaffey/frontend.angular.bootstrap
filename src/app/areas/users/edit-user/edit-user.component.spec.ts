import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUserComponent } from './edit-user.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from '../user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, RouterModule, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: UserService;
  let route: ActivatedRoute
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserComponent],
      imports: [ HttpClientTestingModule, SharedModule, RouterModule ],
      providers:[ UserService,
        { provide:  ActivatedRoute, useValue:{
          snapshot: {
            paramMap: convertToParamMap({ id: '123' }) // Mocking route parameter
        } } }
      ],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
    route = TestBed.inject(ActivatedRoute)

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
