import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarChartDemoComponent } from './bar-chart-demo.component';

describe('BarChartDemoComponent', () => {
  let component: BarChartDemoComponent;
  let fixture: ComponentFixture<BarChartDemoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers:[],
    }).compileComponents().then(() =>
    {
      fixture = TestBed.createComponent(BarChartDemoComponent);
      component = fixture.componentInstance;
    });
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
