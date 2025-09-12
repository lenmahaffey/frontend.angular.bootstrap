import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsDashboardComponent } from './pages/dashboard/events-dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventsService } from './events.service';



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
  ],
    providers: [EventsService]
})
export class EventsModule { }
