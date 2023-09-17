import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { InventoryItemCategory_DTO, InventoryItemSubType_DTO, InventoryItemType_DTO, InventoryItem_DTO, ListInventoryItemsViewModel } from 'src/app/shared/api/api.models';

@Injectable()
export class InventoryService {

  apiUrl = `${Constants.apiRootUrl}/inventory`
  headers = Constants.headers

  constructor(private notificationService: NotificationService, private http: HttpClient) { }

  ListInventoryItems(category: InventoryItemCategory_DTO | undefined,
                     type: InventoryItemType_DTO | undefined,
                     subType: InventoryItemSubType_DTO | undefined) : Observable<InventoryItem_DTO[]>
  {
    let url = `${this.apiUrl}/listInventoryItems`
    let model = new ListInventoryItemsViewModel()
    model.catgeoryId = category?.id || undefined
    model.typeId = type?.id
    model.subTypeId = subType?.id
    let body = JSON.stringify(model)
    return this.http.post<any>(url, body, this.headers).pipe(
      catchError(this.handleError.bind(this)))
  }

  ListAllCategories() : Observable<InventoryItemCategory_DTO[]>
  {
    let url = `${this.apiUrl}/listallitemcategories`
    return this.http.get<any>(url, this.headers).pipe(
      catchError(this.handleError.bind(this)))
  }

  ListAllTypes() : Observable<InventoryItemType_DTO[]>
  {
    let url = `${this.apiUrl}/listallitemtypes`
    return this.http.get<any>(url, this.headers).pipe(
      catchError(this.handleError.bind(this)))
  }

  AddNewCategory(category: InventoryItemCategory_DTO) : Observable<InventoryItemCategory_DTO>
  {
    let url = `${this.apiUrl}/addNewCategory`
    let body = JSON.stringify(category);
    return this.http.post<any>(url, body, this.headers).pipe(
      catchError(this.handleError.bind(this)))
  }

  AddNewType(type: InventoryItemType_DTO) : Observable<InventoryItemType_DTO>
  {
    let url = `${this.apiUrl}/addNewType`
    let body = JSON.stringify(type);
    return this.http.post<any>(url, body, this.headers).pipe(
      catchError(this.handleError.bind(this)))
  }

  AddNewSubType(subType: InventoryItemSubType_DTO) : Observable<InventoryItemSubType_DTO>
  {
    let url = `${this.apiUrl}/addNewSubType`
    let body = JSON.stringify(subType);
    return this.http.post<any>(url, body, this.headers).pipe(
      catchError(this.handleError.bind(this)))
  }

  ImportInventoryItems(file: File){
    let url = `${this.apiUrl}/importInventoryItems`
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(url,formData, {reportProgress: true, observe: 'events'}).pipe(
      catchError(this.handleError.bind(this))
    )
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
