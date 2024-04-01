import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCategoriesComponent } from './list-categories.component';
import { InventoryService } from '../../inventory.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';

describe('ListCategoriesComponent', () => {
  let component: ListCategoriesComponent;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<ListCategoriesComponent>;
  let service: InventoryService

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, SharedModule],
      providers: [InventoryService]
    }).compileComponents().then(() =>
    {
      httpTestingController = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
      service = TestBed.inject(InventoryService);
      fixture = TestBed.createComponent(ListCategoriesComponent);
      component = fixture.componentInstance;
    });
  })

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    httpTestingController.expectOne('http://localhost:5001/inventory/listallitemcategories');
  });
});
