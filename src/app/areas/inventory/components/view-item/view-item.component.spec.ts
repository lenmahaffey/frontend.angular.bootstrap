import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewItemComponent } from './view-item.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventoryService } from '../../inventory.service';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ViewItemComponent', () => {
  let component: ViewItemComponent;
  let fixture: ComponentFixture<ViewItemComponent>;
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
      fixture = TestBed.createComponent(ViewItemComponent);
      component = fixture.componentInstance;
    });

  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
