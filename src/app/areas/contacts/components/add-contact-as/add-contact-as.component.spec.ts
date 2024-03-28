import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactAsComponent } from './add-contact-as.component';

describe('AddContactAsComponent', () => {
  let component: AddContactAsComponent;
  let fixture: ComponentFixture<AddContactAsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddContactAsComponent]
    });
    fixture = TestBed.createComponent(AddContactAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
