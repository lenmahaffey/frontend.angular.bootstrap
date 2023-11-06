import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Contact_DTO } from 'src/app/shared/api/api.models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  headers = Constants.headers
  apiUrl = `${Constants.apiRootUrl}/contact`
  constructor(private notificationService: NotificationService, private http: HttpClient) { }

  listAllContacts()
  {
    const url = `${this.apiUrl}/listcontacts`
    return this.http.get<Contact_DTO[]>(url, this.headers).pipe(
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
