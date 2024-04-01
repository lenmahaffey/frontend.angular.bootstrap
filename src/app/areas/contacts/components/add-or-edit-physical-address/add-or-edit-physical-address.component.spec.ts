import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from '../../contact.service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddOrEditPhysicalAddressComponent } from './add-or-edit-physical-address.component';

describe('AddOrEditPhysicalAddressComponent', () => {
  let component: AddOrEditPhysicalAddressComponent;
  let fixture: ComponentFixture<AddOrEditPhysicalAddressComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ContactService

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditPhysicalAddressComponent],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers:[ ContactService, ContactNamePipe, AppStateService ],
    }).compileComponents().then(() =>
    {
      httpTestingController = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
      service = TestBed.inject(ContactService)
      fixture = TestBed.createComponent(AddOrEditPhysicalAddressComponent);
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
