import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { InventoryItemCategory_DTO, InventoryItemType_DTO, InventoryItem_DTO } from 'src/app/shared/api/api.models';

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
