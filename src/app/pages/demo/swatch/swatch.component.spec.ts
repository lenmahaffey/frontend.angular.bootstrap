import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwatchComponent } from './swatch.component';

describe('SwatchComponent', () => {
  let component: SwatchComponent;
  let fixture: ComponentFixture<SwatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports:[ SharedModule ],
      providers: []
    }).compileComponents()
    fixture = TestBed.createComponent(SwatchComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
