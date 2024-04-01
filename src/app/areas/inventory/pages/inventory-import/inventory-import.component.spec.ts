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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryImportComponent],
      imports: [ HttpClientTestingModule, SharedModule],
      providers:[ InventoryService,
     ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(InventoryService)

    fixture = TestBed.createComponent(InventoryImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
