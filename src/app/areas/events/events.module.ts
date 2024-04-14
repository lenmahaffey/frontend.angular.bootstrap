import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsDashboardComponent } from './pages/dashboard/events-dashboard.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EventsDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'events', component: EventsDashboardComponent },
    ]),
  ]
})
export class EventsModule { }
