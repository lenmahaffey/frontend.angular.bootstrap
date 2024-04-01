import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from '../../contact.service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { AddOrEditContactComponent } from './add-or-edit-contact.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AddOrEditContactComponent', () => {
  let component: AddOrEditContactComponent;
  let fixture: ComponentFixture<AddOrEditContactComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ContactService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ HttpClientTestingModule ],
      providers:[ ContactService, ContactNamePipe, AppStateService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
    }).compileComponents().then(() =>
    {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ContactService)
    fixture = TestBed.createComponent(AddOrEditContactComponent);
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
