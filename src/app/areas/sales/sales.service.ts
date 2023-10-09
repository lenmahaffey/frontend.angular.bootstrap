import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SalesItem_DTO } from 'src/app/shared/api/api.models';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  apiUrl = `${Constants.apiRootUrl}/sales`
  headers = Constants.headers

  constructor(private notificationService: NotificationService, private http: HttpClient) { }

  ListAllSalesItems() : Observable<SalesItem_DTO[]>
  {
    const url = `${this.apiUrl}/listallsalesitems`
    return this.http.get<SalesItem_DTO[]>(url, this.headers).pipe(
      catchError(this.handleError.bind(this)))
  }

  GetSalesItem(id: number)
  {
    const url = `${this.apiUrl}/getSalesItem`
    const params = new HttpParams()
    params.set("id", id)
    return this.http.get<SalesItem_DTO[]>(url, { params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }
  
  addNewSalesItem(item: SalesItem_DTO)
  {
    const url = `${this.apiUrl}/addNewSalesItem`
    const body = JSON.stringify(item);
    return this.http.post<SalesItem_DTO>(url, body, this.headers).pipe(
      catchError(this.handleError.bind(this)))
  }

  updateInventoryItem(item: SalesItem_DTO)
  {
    const url = `${this.apiUrl}/updateNewSalesItem`
    const body = JSON.stringify(item);
    return this.http.post<SalesItem_DTO>(url, body, this.headers).pipe(
      catchError(this.handleError.bind(this)))
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = ''
    if (err.error.length > 0) {
      console.log(err.error)
      err.error.forEach((x: any) => {
        errorMessage = `An error occured: ${x.errorMessage}`
        const message = new Message()
        message.type = MessageType.Error
        message.title = "Error"
        message.text = errorMessage
        this.notificationService.sendNotification(message)
      });
    }
    else {
        errorMessage = `Server returned code ${err.status}, error message is ${err.message}`
        const message = new Message()
        message.type = MessageType.Error
        message.title = "Error"
        message.text = errorMessage
        this.notificationService.sendNotification(message)
    }
    return throwError(() => errorMessage)
  }
}
