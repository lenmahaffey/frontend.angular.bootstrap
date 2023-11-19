import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Contact_DTO, EmailAddress_DTO, PhoneNumber_DTO, PhysicalAddress_DTO } from 'src/app/shared/api/api.models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  headers = Constants.headers
  apiUrl = `${Constants.apiRootUrl}/contact`
  constructor(private notificationService: NotificationService, private http: HttpClient) { }

  getContact(id: number, info:boolean)
  {
    const url = `${this.apiUrl}/getcontact`
    const params = new HttpParams().set("info", info).set("id", id)
    return this.http.get<Contact_DTO>(url, { headers: this.headers, params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }

  listAllContacts(info: boolean)
  {
    const url = `${this.apiUrl}/listcontacts`
    const params = new HttpParams().set("info", info)
    return this.http.get<Contact_DTO[]>(url, {headers: this.headers, params: params}).pipe(
      catchError(this.handleError.bind(this)))
  }

  AddContact(contact: Contact_DTO)
  {
    const url = `${this.apiUrl}/addcontact`
    const body = JSON.stringify(contact)
    return this.http.post<Contact_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  AddPhoneNumber(number: PhoneNumber_DTO)
  {
    const url = `${this.apiUrl}/addphonenumber`
    const body = JSON.stringify(number)
    return this.http.post<PhoneNumber_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  UpdatePhoneNumber(number: PhoneNumber_DTO)
  {
    const url = `${this.apiUrl}/updatephonenumber`
    const body = JSON.stringify(number)
    return this.http.post<PhoneNumber_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  DeletePhoneNumber(number: PhoneNumber_DTO)
  {
    console.log(number)
    const url = `${this.apiUrl}/deletephonenumber`
    const body = JSON.stringify(number)
    return this.http.delete(url, {headers: this.headers, body: number.id }).pipe(
      catchError(this.handleError.bind(this)))
  }

  AddEmailAddress(address:EmailAddress_DTO) : Observable<EmailAddress_DTO>
  {
    const url = `${this.apiUrl}/addemailaddress`
    const body = JSON.stringify(address)
    return this.http.post<EmailAddress_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  UpdateEmailAddress(address:EmailAddress_DTO) : Observable<EmailAddress_DTO>
  {
    const url = `${this.apiUrl}/updateemailaddress`
    const body = JSON.stringify(address)
    return this.http.post<EmailAddress_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  DeleteEmailAddress(address:EmailAddress_DTO)
  {
    const url = `${this.apiUrl}/deleteemailaddress`
    const body = JSON.stringify(address)
    return this.http.delete(url, {headers: this.headers, body: address.id }).pipe(
      catchError(this.handleError.bind(this)))
  }

  AddPhysicalAddress(number: PhysicalAddress_DTO)
  {
    const url = `${this.apiUrl}/addphysicaladdress`
    const body = JSON.stringify(number)
    return this.http.post<PhysicalAddress_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  UpdatePhysicalAddress(number: PhysicalAddress_DTO)
  {
    const url = `${this.apiUrl}/updatephysicaladdress`
    const body = JSON.stringify(number)
    return this.http.post<PhysicalAddress_DTO>(url, body, { headers: this.headers }).pipe(
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
