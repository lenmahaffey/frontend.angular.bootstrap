import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddContactAsComponent } from './add-contact-as.component';
import { ContactService } from '../../contact.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AddContactAsComponent', () => {
  let component: AddContactAsComponent;
  let fixture: ComponentFixture<AddContactAsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ContactService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ AddContactAsComponent ],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers:[ ContactService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
     ],
    }).compileComponents().then(() =>
    {
      httpTestingController = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
      service = TestBed.inject(ContactService)
      fixture = TestBed.createComponent(AddContactAsComponent);
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
