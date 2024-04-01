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

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ HttpClientTestingModule ],
      providers:[ InventoryService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
    }).compileComponents().then(() =>
    {
      httpTestingController = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
      service = TestBed.inject(InventoryService)
      fixture = TestBed.createComponent(AddNewTypeComponent);
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
