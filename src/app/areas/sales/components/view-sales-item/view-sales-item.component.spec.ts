import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewSalesItemComponent } from './view-sales-item.component';
import { SalesService } from '../../sales.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactService } from 'src/app/areas/contacts/contact.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ViewSalesItemComponent', () => {
  let component: ViewSalesItemComponent;
  let fixture: ComponentFixture<ViewSalesItemComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: SalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSalesItemComponent],
      imports: [ HttpClientTestingModule, SharedModule],
      providers:[ ContactService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
     ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SalesService)

    fixture = TestBed.createComponent(ViewSalesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
