import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { InventoryItemCategory_DTO, InventoryItemSubType_DTO, InventoryItemType_DTO, InventoryItem_DTO } from 'src/app/shared/api/api.models';

@Injectable()
export class InventoryService {

  apiUrl = `${Constants.apiRootUrl}/inventory`
  headers = Constants.headers

  constructor(private notificationService: NotificationService, private http: HttpClient) { }

  ListAllItems() : Observable<InventoryItem_DTO[]>
  {
    let url = `${this.apiUrl}/listallitems`
    return this.http.get<any>(url, this.headers).pipe(
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

  private handleError(err: HttpErrorResponse) {
    let errorMessage = ''
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occured: ${err.error.message}`
    }
    else {
        errorMessage = `Server returned code ${err.status}, error message is ${err.message}`
    }
    return throwError(() => errorMessage)
  }
}
