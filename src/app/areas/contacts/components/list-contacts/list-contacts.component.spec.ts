import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListContactsComponent } from './list-contacts.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from '../../contact.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ListContactsComponent', () => {
  let component: ListContactsComponent;
  let fixture: ComponentFixture<ListContactsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ContactService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListContactsComponent],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers:[ ContactService, ContactNamePipe, AppStateService ],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ContactService)

    fixture = TestBed.createComponent(ListContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
