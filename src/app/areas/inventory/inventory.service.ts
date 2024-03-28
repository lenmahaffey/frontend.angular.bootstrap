import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { InventoryItemCategory_DTO, InventoryItemSubType_DTO, InventoryItemType_DTO, InventoryItem_DTO, ListInventoryItemsViewModel, Manufacturer_DTO, Vendor_DTO } from 'src/app/shared/api/api.models';
import { ServiceBase } from 'src/app/shared/serviceBase';

@Injectable()
export class InventoryService extends ServiceBase {

  apiUrl = `${Constants.apiRootUrl}/inventory`

  constructor(private notificationService: NotificationService, private http: HttpClient)
  {
     super (notificationService)
  }

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

  CreateNewManufacturer(contactId: number) : Observable<Manufacturer_DTO>
  {
    const url = `${this.apiUrl}/addNewManufacturer`
    const model = new Manufacturer_DTO()
    model.contactId = contactId
    const body = JSON.stringify(model)
    return this.http.post<Manufacturer_DTO>(url, body, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this)))
  }

  CreateNewVendor(contactId: number) : Observable<Vendor_DTO>
  {
    const url = `${this.apiUrl}/addNewVendor`
    const model = new Vendor_DTO()
    model.contactId = contactId
    const body = JSON.stringify(model)
    return this.http.post<Vendor_DTO>(url, body, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this)))
  }
}
