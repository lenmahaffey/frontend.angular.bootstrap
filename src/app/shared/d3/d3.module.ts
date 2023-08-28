import { NgModule } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';



@NgModule({
  declarations: [
    BarChartComponent,
    PieChartComponent
  ],
  imports: [
  ],
  exports:[
    BarChartComponent,
    PieChartComponent
  ]
})
export class D3Module { }
