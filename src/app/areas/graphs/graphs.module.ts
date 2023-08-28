import { NgModule } from '@angular/core';
import { BarChartDemoComponent } from './bar-chart-demo/bar-chart-demo.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PieChartDemoComponent } from './pie-chart-demo/pie-chart-demo.component';



@NgModule({
  declarations: [
    BarChartDemoComponent,
    PieChartDemoComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path:'graphs/barchart', component: BarChartDemoComponent},
      {path:'graphs/piechart', component: PieChartDemoComponent}
    ])
  ]
})
export class GraphsModule { }
