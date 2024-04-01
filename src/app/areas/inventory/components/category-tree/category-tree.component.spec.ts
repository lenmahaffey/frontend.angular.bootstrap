import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryTreeComponent } from './category-tree.component';
import { InventoryService } from '../../inventory.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('CategoryTreeComponent', () => {
  let component: CategoryTreeComponent;
  let fixture: ComponentFixture<CategoryTreeComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: InventoryService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CategoryTreeComponent],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers:[ InventoryService ],
    }).compileComponents().then(() =>
    {
      httpTestingController = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
      service = TestBed.inject(InventoryService)
      fixture = TestBed.createComponent(CategoryTreeComponent);
      component = fixture.componentInstance;
    });
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    httpTestingController.expectOne('http://localhost:5001/inventory/listallitemcategories');
  });
});
