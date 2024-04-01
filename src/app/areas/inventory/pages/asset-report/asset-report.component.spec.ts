import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetReportComponent } from './asset-report.component';
import { InventoryService } from '../../inventory.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from 'src/app/areas/contacts/contact.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AssetReportComponent', () => {
  let component: AssetReportComponent;
  let fixture: ComponentFixture<AssetReportComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: InventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetReportComponent],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers:[ InventoryService, ContactNamePipe, AppStateService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(InventoryService);

    fixture = TestBed.createComponent(AssetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
