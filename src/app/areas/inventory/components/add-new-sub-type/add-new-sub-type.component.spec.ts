import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewSubTypeComponent } from './add-new-sub-type.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventoryService } from '../../inventory.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AddNewSubTypeComponent', () => {
  let component: AddNewSubTypeComponent;
  let fixture: ComponentFixture<AddNewSubTypeComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: InventoryService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewSubTypeComponent],
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

    fixture = TestBed.createComponent(AddNewSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
