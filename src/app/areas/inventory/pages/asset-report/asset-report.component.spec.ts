import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetReportComponent } from './asset-report.component';

describe('AssetReportComponent', () => {
  let component: AssetReportComponent;
  let fixture: ComponentFixture<AssetReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetReportComponent]
    });
    fixture = TestBed.createComponent(AssetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
