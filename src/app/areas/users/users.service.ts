import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PhysicalAddress, User } from 'src/app/shared/api/api.models';

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

  getUser(id: number)
  {
    let params = new HttpParams().set('eventAvlNumber', id)
    let url = `${this.apiUrl}/getuser/` + id
    return this.http.get<any>(url, this.headers).pipe(
      catchError(this.handleError.bind(this)))
  }

  updateUser(user: User)
  {
    let url = `${this.apiUrl}/updateuser/`
    let body = JSON.stringify(user)
    return this.http.put<User>(url, body, this.headers).pipe(
      catchError(this.handleError.bind(this)))
  }

  testMethod(address: PhysicalAddress)
  {
    let url = `${this.apiUrl}/testmethod/`
    let body = JSON.stringify(address)
    return this.http.post<User>(url, body, this.headers).pipe(
      catchError(this.handleError.bind(this)))
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = ''
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occured: ${err.error.message}`
        let message = new Message()
        message.type = MessageType.Error
        message.title = "Error"
        message.text = errorMessage
        this.notificationService.sendNotification(message)
    }
    else {
        errorMessage = `Server returned code ${err.status}, error message is ${err.message}`
        let message = new Message()
        message.type = MessageType.Error
        message.title = "Error"
        message.text = errorMessage
        this.notificationService.sendNotification(message)
    }
    return throwError(() => errorMessage)
  }
}
