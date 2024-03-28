import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Freelancer_DTO } from 'src/app/shared/api/api.models';
import { ServiceBase } from 'src/app/shared/serviceBase';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService extends ServiceBase {

  apiUrl = `${Constants.apiRootUrl}/freelancer`
  constructor(private notificationService: NotificationService, private http: HttpClient)
  {
    super(notificationService);
  }

  CreateNewFreelancer(contactId: number) : Observable<Freelancer_DTO>
  {
    const url = `${this.apiUrl}/addNewFreelancer`
    const model = new Freelancer_DTO()
    model.contactId = contactId
    const body = JSON.stringify(model)
    return this.http.post<Freelancer_DTO>(url, body, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this)))
  }
}
