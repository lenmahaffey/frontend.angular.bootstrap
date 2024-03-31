import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewSubTypeComponent } from './add-new-sub-type.component';

describe('AddNewSubTypeComponent', () => {
  let component: AddNewSubTypeComponent;
  let fixture: ComponentFixture<AddNewSubTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewSubTypeComponent]
    });
    fixture = TestBed.createComponent(AddNewSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
