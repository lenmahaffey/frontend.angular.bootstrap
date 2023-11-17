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
    const url = `${this.apiUrl}/listInventoryItems`
    const model = new ListInventoryItemsViewModel()
    model.categoryId = category?.id || undefined
    model.typeId = type?.id
    model.subTypeId = subType?.id
    const body = JSON.stringify(model)
    return this.http.post<InventoryItem_DTO[]>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  ListAllCategories() : Observable<InventoryItemCategory_DTO[]>
  {
    const url = `${this.apiUrl}/listallitemcategories`
    return this.http.get<InventoryItemCategory_DTO[]>(url, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  ListAllTypes() : Observable<InventoryItemType_DTO[]>
  {
    const url = `${this.apiUrl}/listallitemtypes`
    return this.http.get<InventoryItemType_DTO[]>(url, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  AddNewCategory(category: InventoryItemCategory_DTO) : Observable<InventoryItemCategory_DTO>
  {
    const url = `${this.apiUrl}/addNewCategory`
    const body = JSON.stringify(category);
    return this.http.post<InventoryItemCategory_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  AddNewType(type: InventoryItemType_DTO) : Observable<InventoryItemType_DTO>
  {
    const url = `${this.apiUrl}/addNewType`
    const body = JSON.stringify(type);
    return this.http.post<InventoryItemType_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  AddNewSubType(subType: InventoryItemSubType_DTO) : Observable<InventoryItemSubType_DTO>
  {
    const url = `${this.apiUrl}/addNewSubType`
    const body = JSON.stringify(subType);
    return this.http.post<InventoryItemSubType_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  ImportInventoryItems(file: File){
    const url = `${this.apiUrl}/importInventoryItems`
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(url,formData, {reportProgress: true, observe: 'events'}).pipe(
      catchError(this.handleError.bind(this))
    )
  }
  GetInventoryValue() : Observable<any>
  {
    const url = `${this.apiUrl}/getInventoryValue`
    return this.http.get<any>(url, { headers: this.headers }).pipe(
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
