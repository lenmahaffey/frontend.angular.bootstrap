import { Component } from '@angular/core';
import { EventsSideBarNavLinks } from '../../event-side-bar-links';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { EventsService } from '../../events.service';
import { Conference_DTO } from 'src/app/shared/api/api.models';
import { UtcToLocalPipe } from 'src/app/shared/pipes/utc-to-local.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.css'],
  standalone: false
})
export class EventsDashboardComponent {
  links: EventsSideBarNavLinks = new EventsSideBarNavLinks()
  conferences: Conference_DTO[] = []
  constructor(private appStateService: AppStateService,
              private eventService: EventsService,
              private datePipe: UtcToLocalPipe) {
    this.appStateService.setLeftSideMenuItems(this.links)
    this.getConferences()
  }
  displayedColumns: string[] = ['name', 'startDate', 'endDate'];
  getConferences(){
    this.appStateService.openSpinner("Getting Conferences");
    const sub = this.eventService.ListConferences().subscribe({
      next: (data) =>
      {
        this.conferences = data
      },
      error: () =>
      {
        this.appStateService.closeSpinner();
      },
      complete: () =>
      {
        sub.unsubscribe();
        this.appStateService.closeSpinner()
      }
    })
  }
}
