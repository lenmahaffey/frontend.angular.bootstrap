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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCategoriesComponent],
      imports: [HttpClientTestingModule, SharedModule],
      providers: [InventoryService]
    });
    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ListCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
