import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewSalesItemComponent } from './view-sales-item.component';

describe('ViewSalesItemComponent', () => {
  let component: ViewSalesItemComponent;
  let fixture: ComponentFixture<ViewSalesItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSalesItemComponent]
    });
    fixture = TestBed.createComponent(ViewSalesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
