import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSalesItemComponent } from './create-sales-item.component';

describe('CreateSalesItemComponent', () => {
  let component: CreateSalesItemComponent;
  let fixture: ComponentFixture<CreateSalesItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSalesItemComponent]
    });
    fixture = TestBed.createComponent(CreateSalesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
