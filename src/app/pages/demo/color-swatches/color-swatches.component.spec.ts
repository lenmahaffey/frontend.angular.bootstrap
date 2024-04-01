import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ColorSwatchesComponent } from './color-swatches.component';
import { SwatchComponent } from './swatch/swatch.component';

describe('ColorSwatchesComponent', () => {
  let component: ColorSwatchesComponent;
  let fixture: ComponentFixture<ColorSwatchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SwatchComponent ],
      imports:[ SharedModule ],
      providers: []
    }).compileComponents()
    fixture = TestBed.createComponent(ColorSwatchesComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
