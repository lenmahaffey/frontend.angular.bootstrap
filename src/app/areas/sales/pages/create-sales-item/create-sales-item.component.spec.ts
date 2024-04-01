import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSalesItemComponent } from './create-sales-item.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventoryService } from 'src/app/areas/inventory/inventory.service';
import { CategoryTreeComponent } from 'src/app/areas/inventory/components/category-tree/category-tree.component';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupItemsComponent } from 'src/app/areas/inventory/components/group-items/group-items.component';

describe('CreateSalesItemComponent', () => {
  let component: CreateSalesItemComponent;
  let fixture: ComponentFixture<CreateSalesItemComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: InventoryService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSalesItemComponent, CategoryTreeComponent, GroupItemsComponent],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers:[ InventoryService ],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(InventoryService)

    fixture = TestBed.createComponent(CreateSalesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
