import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Customer_DTO } from 'src/app/shared/api/api.models';
import { ServiceBase } from 'src/app/shared/serviceBase';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends ServiceBase {

  apiUrl = `${Constants.apiRootUrl}/customer`
  constructor(private notificationService: NotificationService, private http: HttpClient)
  {
    super(notificationService);
  }

  CreateNewCustomer(contactId: number) : Observable<Customer_DTO>
  {
    const url = `${this.apiUrl}/addNewCustomer`
    const model = new Customer_DTO()
    model.contactId = contactId
    const body = JSON.stringify(model)
    return this.http.post<Customer_DTO>(url, body, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this)))
  }
}
