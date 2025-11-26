import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDemoComponent } from './confirmation-demo.component';

describe('ConfirmationDemoComponent', () => {
  let component: ConfirmationDemoComponent;
  let fixture: ComponentFixture<ConfirmationDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
