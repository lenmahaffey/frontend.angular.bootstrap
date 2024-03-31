import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { ColorSwatchesComponent } from './color-swatches.component';
import { PagesModule } from '../../pages.module';

describe('ColorSwatchesComponent', () => {
  let component: ColorSwatchesComponent;
  let fixture: ComponentFixture<ColorSwatchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorSwatchesComponent],
      imports:[HttpClientTestingModule, SharedModule, PagesModule],
      providers: [ MatDialog ]
    });
    fixture = TestBed.createComponent(ColorSwatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
