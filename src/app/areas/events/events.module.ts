import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsDashboardComponent } from './pages/dashboard/events-dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewEventComponent } from './pages/view-event/view-event.component';



@NgModule({
  declarations: [
    EventsDashboardComponent,
    ViewEventComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'events', component: EventsDashboardComponent },
      { path: 'events/:id', component: ViewEventComponent },
    ]),
  ]
})
export class EventsModule { }
