import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Competitor_DTO, SalesItem_DTO } from 'src/app/shared/api/api.models';
import { ServiceBase } from 'src/app/shared/serviceBase';

@Injectable({
  providedIn: 'root'
})
export class SalesService extends ServiceBase{

  apiUrl = `${Constants.apiRootUrl}/sales`

  constructor(private notificationService: NotificationService, private http: HttpClient)
  {
    super(notificationService)
  }

  ListAllSalesItems() : Observable<SalesItem_DTO[]>
  {
    const url = `${this.apiUrl}/listallsalesitems`
    return this.http.get<SalesItem_DTO[]>(url, { headers: this.headers }).pipe(
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

  // addNewSalesItem(model: CreateNewInventorySalesItemViewModel)
  // {
  //   const url = `${this.apiUrl}/addSalesItem`
  //   const body = JSON.stringify(model);
  //   return this.http.post<SalesItem_DTO>(url, body, { headers: this.headers }).pipe(
  //     catchError(this.handleError.bind(this)))
  // }

  updateInventoryItem(item: SalesItem_DTO)
  {
    const url = `${this.apiUrl}/updateNewSalesItem`
    const body = JSON.stringify(item);
    return this.http.post<SalesItem_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }

  createNewCompetitor(contactId: number) : Observable<Competitor_DTO>
  {
    const url = `${this.apiUrl}/addNewCompetitor`
    const model = new Competitor_DTO()
    model.contactId = contactId
    const body = JSON.stringify(model)
    return this.http.post<Competitor_DTO>(url, body, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this)))
  }
}
