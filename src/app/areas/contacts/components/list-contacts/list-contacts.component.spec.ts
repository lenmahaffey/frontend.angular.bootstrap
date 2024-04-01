import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListContactsComponent } from './list-contacts.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from '../../contact.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { InventoryService } from 'src/app/areas/inventory/inventory.service';

describe('ListContactsComponent', () => {
  let component: ListContactsComponent;
  let fixture: ComponentFixture<ListContactsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ContactService

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ListContactsComponent],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers:[ InventoryService ],
    }).compileComponents().then(() =>
    {
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      service = TestBed.inject(ContactService)
      fixture = TestBed.createComponent(ListContactsComponent);
      component = fixture.componentInstance;
    });
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    httpTestingController.expectOne('http://localhost:5001/contact/listcontacts?info=true');
  });

});
