import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryDashboardComponent } from './inventory-dashboard.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactService } from 'src/app/areas/contacts/contact.service';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryDashboardComponent, CategoryTreeComponent, GroupItemsComponent],
      imports: [ HttpClientTestingModule, SharedModule],
      providers:[ InventoryService, MatDialog,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
     ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(InventoryService)

    fixture = TestBed.createComponent(InventoryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
