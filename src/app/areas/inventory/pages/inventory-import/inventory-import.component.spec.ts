import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryImportComponent } from './inventory-import.component';

describe('InventoryImportComponent', () => {
  let component: InventoryImportComponent;
  let fixture: ComponentFixture<InventoryImportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryImportComponent]
    });
    fixture = TestBed.createComponent(InventoryImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
