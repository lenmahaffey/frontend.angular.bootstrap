import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryDashboardComponent } from './inventory-dashboard.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { InventoryService } from '../../inventory.service';
import { HttpClient } from '@angular/common/http';
import { CategoryTreeComponent } from '../../components/category-tree/category-tree.component';
import { GroupItemsComponent } from '../../components/group-items/group-items.component';

describe('InventoryDashboardComponent', () => {
  let component: InventoryDashboardComponent;
  let fixture: ComponentFixture<InventoryDashboardComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: InventoryService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [InventoryDashboardComponent, CategoryTreeComponent, GroupItemsComponent],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers:[ InventoryService ],
    }).compileComponents().then(() =>
    {
      httpTestingController = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
      service = TestBed.inject(InventoryService)
      fixture = TestBed.createComponent(InventoryDashboardComponent);
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
    httpTestingController.expectOne('http://localhost:5001/inventory/listallitemcategories');
  });
});
