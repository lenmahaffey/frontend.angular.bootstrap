import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PieChartComponent } from 'src/app/shared/d3/pie-chart/pie-chart.component';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers:[],
    })
      fixture = TestBed.createComponent(PieChartComponent);
      component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
