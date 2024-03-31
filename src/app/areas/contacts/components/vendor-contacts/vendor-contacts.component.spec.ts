import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from '../../contact.service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { VendorContactsComponent } from './vendor-contacts.component';

describe('ListContactsComponent', () => {
  let component: VendorContactsComponent;
  let fixture: ComponentFixture<VendorContactsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ContactService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorContactsComponent],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers:[ ContactService, ContactNamePipe, AppStateService ],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ContactService)

    fixture = TestBed.createComponent(VendorContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
