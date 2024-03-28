import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Employee_DTO } from 'src/app/shared/api/api.models';
import { ServiceBase } from 'src/app/shared/serviceBase';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends ServiceBase {

  apiUrl = `${Constants.apiRootUrl}/employee`
  constructor(private notificationService: NotificationService, private http: HttpClient)
  {
    super(notificationService);
  }

  CreateNewEmployee(contactId: number) : Observable<Employee_DTO>
  {
    const url = `${this.apiUrl}/addNewEmployee`
    const model = new Employee_DTO()
    model.contactId = contactId
    const body = JSON.stringify(model)
    return this.http.post<Employee_DTO>(url, body, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this)))
  }
}
