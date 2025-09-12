import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { EventsService } from '../../events.service';
import { take } from 'rxjs';
import { Conference_DTO } from 'src/app/shared/api/api.models';
import { Message } from 'src/app/services/message';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

  conferenceId: number | undefined
  conference: Conference_DTO | undefined
  constructor(private route:ActivatedRoute,
    private service: EventsService,
    private appState: AppStateService)
  {
    this.conferenceId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getConference()
  }

  getConference()
  {
    this.appState.openSpinner("Getting Conference")

    if(this.conferenceId != undefined && this.conferenceId != 0)
      {
        this.service.GetConference(this.conferenceId).pipe(take(1)).subscribe(
          {
            next: (data) =>
              {
                this.conference = data
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
  }
}
