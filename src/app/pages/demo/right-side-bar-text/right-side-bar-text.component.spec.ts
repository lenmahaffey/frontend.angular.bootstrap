import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideBarTextComponent } from './right-side-bar-text.component';

describe('RightSideBarTextComponent', () => {
  let component: RightSideBarTextComponent;
  let fixture: ComponentFixture<RightSideBarTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightSideBarTextComponent]
    });
    fixture = TestBed.createComponent(RightSideBarTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
