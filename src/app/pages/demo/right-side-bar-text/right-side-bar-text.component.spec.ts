import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideBarTextComponent } from './right-side-bar-text.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';

describe('RightSideBarTextComponent', () => {
  let component: RightSideBarTextComponent;
  let fixture: ComponentFixture<RightSideBarTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightSideBarTextComponent],
      imports:[HttpClientTestingModule, SharedModule],
      providers:[ MatDialog ]
    });
    fixture = TestBed.createComponent(RightSideBarTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
