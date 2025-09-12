import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { Message } from 'src/app/services/message';
import { Conference_DTO } from 'src/app/shared/api/api.models';
import { EventsService } from '../../events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.css']
})
export class EventsDashboardComponent implements OnInit{

  conferences: Conference_DTO[] = []

  constructor( private service: EventsService,
    private appState: AppStateService,
    private router: Router,) {
  }
  ngOnInit(): void {
    this.listAllConferences()
  }

  listAllConferences()
  {
    this.appState.openSpinner("Getting Conferences")

    this.service.ListAllConferences().pipe(take(1)).subscribe(
      {
        next: (data) =>
          {
            this.conferences = data
          },
        error: () =>
        {
          this.appState.sendAlert(new Message())
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }

  viewConferenceClicked(id: number)
  {
    this.router.navigate([`events/${id}`])
  }
}
