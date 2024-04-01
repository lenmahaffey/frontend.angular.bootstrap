import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemsComponent } from './list-items.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventoryService } from '../../inventory.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: InventoryService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers:[ InventoryService ]
    }).compileComponents().then(() =>
    {
      httpTestingController = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
      service = TestBed.inject(InventoryService);
      fixture = TestBed.createComponent(ListItemsComponent);
      component = fixture.componentInstance;
    });
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    httpTestingController.expectOne('http://localhost:5001/inventory/listInventoryItems');
  });
});
