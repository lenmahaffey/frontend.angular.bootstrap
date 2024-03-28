import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PhysicalAddress_DTO, User_DTO } from 'src/app/shared/api/api.models';
import { ServiceBase } from 'src/app/shared/serviceBase';

@Injectable()
export class UserService extends ServiceBase {

  apiUrl = `${Constants.apiRootUrl}/user`

  constructor(private notificationService: NotificationService, private http: HttpClient)
  {
    super(notificationService)
  }

  ListAllUsers() : Observable<User_DTO[]>
  {
    let url = `${this.apiUrl}/listallusers`
    return this.http.get<any>(url, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  getUser(id: number)
  {
    let params = new HttpParams().set('eventAvlNumber', id)
    let url = `${this.apiUrl}/getuser/` + id
    return this.http.get<any>(url, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  updateUser(user: User_DTO)
  {
    let url = `${this.apiUrl}/updateuser/`
    let body = JSON.stringify(user)
    return this.http.put<User_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  testMethod(address: PhysicalAddress_DTO)
  {
    let url = `${this.apiUrl}/testmethod/`
    let body = JSON.stringify(address)
    return this.http.post<User_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }
}
