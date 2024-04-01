import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewTypeComponent } from './add-new-type.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventoryService } from '../../inventory.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AddNewTypeComponent', () => {
  let component: AddNewTypeComponent;
  let fixture: ComponentFixture<AddNewTypeComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: InventoryService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewTypeComponent],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers:[ InventoryService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
    });
    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(InventoryService)

    fixture = TestBed.createComponent(AddNewTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
