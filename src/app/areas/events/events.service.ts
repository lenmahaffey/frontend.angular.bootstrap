import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Conference_DTO, Venue_DTO } from 'src/app/shared/api/api.models';
import { ServiceBase } from 'src/app/shared/serviceBase';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends ServiceBase {

  apiUrl = `${Constants.apiRootUrl}/event`
  constructor(private notificationService: NotificationService, private http: HttpClient)
  {
    super(notificationService);
  }

  CreateNewVenue(contactId: number) : Observable<Venue_DTO>
  {
    const url = `${this.apiUrl}/addNewVenue`
    const model = new Venue_DTO()
    model.contactId = contactId
    const body = JSON.stringify(model)
    return this.http.post<Venue_DTO>(url, body, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this)))
  }

  ListConferences(): Observable<Conference_DTO[]>
  {
    const url = `${this.apiUrl}/listconferences`
    return this.http.get<Conference_DTO[]>(url, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this)))
  }

  GetConference(conferenceId: number): Observable<Conference_DTO>
  {
const url = `${this.apiUrl}/getconference`
    return this.http.get<Conference_DTO>(url, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this)))
  }
}
