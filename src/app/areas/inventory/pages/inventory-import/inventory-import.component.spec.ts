import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryImportComponent } from './inventory-import.component';
import { InventoryService } from '../../inventory.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('InventoryImportComponent', () => {
  let component: InventoryImportComponent;
  let fixture: ComponentFixture<InventoryImportComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: InventoryService

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ HttpClientTestingModule, SharedModule],
      providers:[ InventoryService ],
    }).compileComponents().then(() =>
    {
      httpTestingController = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
      service = TestBed.inject(InventoryService)
      fixture = TestBed.createComponent(InventoryImportComponent);
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
