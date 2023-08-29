import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { User } from 'src/app/shared/api/api.models';

@Injectable()
export class UsersService {

  apiUrl = `${Constants.apiRootUrl}/user`
  headers = Constants.headers

  constructor(private notificationService: NotificationService, private http: HttpClient)
  {}

  ListAllUsers() : Observable<User[]>
  {
    let url = `${this.apiUrl}/listallusers`
    return this.http.get<any>(url, this.headers).pipe(
      catchError(this.handleError.bind(this)))
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = ''
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occured: ${err.error.message}`
    }
    else {
        errorMessage = `Server returned code ${err.status}, error message is ${err.message}`
    }
    let message = new Message(MessageType.Error);
    message.text = errorMessage
    this.notificationService.sendNotification(message)
    return throwError(() => errorMessage)
}
}
