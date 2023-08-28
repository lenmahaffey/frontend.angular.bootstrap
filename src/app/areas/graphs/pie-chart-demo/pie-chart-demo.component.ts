import { Component, ViewEncapsulation } from '@angular/core';
import { PieChartData } from 'src/app/shared/d3/pie-chart/pie-chart-data.interface';

@Component({
  selector: 'app-pie-chart-demo',
  templateUrl: './pie-chart-demo.component.html',
  styleUrls: ['./pie-chart-demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PieChartDemoComponent {
  chartTitle = "Pie Chart Demo"
  data: PieChartData[] = [{Name: "Yes", Value: "200"},{Name: "No", Value: "150"}]
  chartTitle1 = "Pie Chart Demo"
  data1: PieChartData[] = [{Name: "Yes", Value: "300"},{Name: "No", Value: "100"}]
}
