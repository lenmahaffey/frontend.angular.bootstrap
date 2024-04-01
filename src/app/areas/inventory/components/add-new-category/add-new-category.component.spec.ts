import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewCategoryComponent } from './add-new-category.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../../inventory.service';

describe('AddNewCategoryComponent', () => {
  let component: AddNewCategoryComponent;
  let fixture: ComponentFixture<AddNewCategoryComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: InventoryService

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ HttpClientTestingModule ],
      providers:[ InventoryService ],
    }).compileComponents().then(() =>
    {
      httpTestingController = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
      service = TestBed.inject(InventoryService);
      fixture = TestBed.createComponent(AddNewCategoryComponent);
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
