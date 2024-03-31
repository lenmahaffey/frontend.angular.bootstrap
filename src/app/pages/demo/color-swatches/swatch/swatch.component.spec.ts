import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { SwatchComponent } from './swatch.component';
import { PagesModule } from 'src/app/pages/pages.module';

describe('SwatchComponent', () => {
  let component: SwatchComponent;
  let fixture: ComponentFixture<SwatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwatchComponent],
      imports:[HttpClientTestingModule, SharedModule, PagesModule],
      providers: [ MatDialog ]
    });
    fixture = TestBed.createComponent(SwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
