import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CompetitorContact_DTO, Contact_DTO, CustomerContact_DTO, Customer_DTO, EmailAddress_DTO, ManufacturerContact_DTO, Manufacturer_DTO, PhoneNumber_DTO, PhysicalAddress_DTO, VendorContact_DTO, VenueContact_DTO } from 'src/app/shared/api/api.models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  headers = Constants.headers
  apiUrl = `${Constants.apiRootUrl}/contact`
  constructor(private notificationService: NotificationService, private http: HttpClient) { }

  getContact(id: number, info:boolean) : Observable<Contact_DTO>
  {
    const url = `${this.apiUrl}/getcontact`
    const params = new HttpParams().set("info", info).set("id", id)
    return this.http.get<Contact_DTO>(url, { headers: this.headers, params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }
  // getContactInformation(id: number) : Observable<ContactInformation_DTO>
  // {
  //   const url = `${this.apiUrl}/getcontactinformation`
  //   const params = new HttpParams().set("id", id)
  //   return this.http.get<ContactInformation_DTO>(url, { headers: this.headers, params: params }).pipe(
  //     catchError(this.handleError.bind(this)))
  // }
  listAllContacts(info: boolean) : Observable<Contact_DTO[]>
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
  AddPhoneNumber(number: PhoneNumber_DTO) : Observable<PhoneNumber_DTO>
  {
    const url = `${this.apiUrl}/addphonenumber`
    const body = JSON.stringify(number)
    return this.http.post<PhoneNumber_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }
  GetPhoneNumbersForContact(contactId: number) : Observable<PhoneNumber_DTO[]>
  {
    const url = `${this.apiUrl}/listphonenumbersforcontact`
    const params = new HttpParams().set("contactId", contactId)
    return this.http.get<PhoneNumber_DTO[]>(url, { headers: this.headers, params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }
  UpdatePhoneNumber(number: PhoneNumber_DTO) : Observable<PhoneNumber_DTO>
  {
    const url = `${this.apiUrl}/updatephonenumber`
    const body = JSON.stringify(number)
    return this.http.post<PhoneNumber_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }
  DeletePhoneNumber(number: PhoneNumber_DTO)
  {
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
  AddPhysicalAddress(address: PhysicalAddress_DTO): Observable<PhysicalAddress_DTO>
  {
    const url = `${this.apiUrl}/addphysicaladdress`
    const body = JSON.stringify(address)
    return this.http.post<PhysicalAddress_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }
  UpdatePhysicalAddress(address: PhysicalAddress_DTO) : Observable<PhysicalAddress_DTO>
  {
    const url = `${this.apiUrl}/updatephysicaladdress`
    const body = JSON.stringify(address)
    return this.http.post<PhysicalAddress_DTO>(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError.bind(this)))
  }
  DeletePhysicalAddress(address: PhysicalAddress_DTO)
  {
    const url = `${this.apiUrl}/deletephysicaladdress`
    return this.http.delete(url, { headers: this.headers, body: address.id }).pipe(
      catchError(this.handleError.bind(this)))
  }
  DeleteContact(contact:Contact_DTO)
  {
    const url = `${this.apiUrl}/deletecontact`
    return this.http.delete(url, {headers: this.headers, body: contact.id}).pipe(
      catchError(this.handleError.bind(this))
    )
  }
  UpdateContact(contact:Contact_DTO) : Observable<Contact_DTO>
  {
    const url = `${this.apiUrl}/updatecontact`
    const body = JSON.stringify(contact)
    return this.http.post<Contact_DTO>(url, body, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this))
    )
  }
  AddCompetitorContact(competitorId: number, contactId: number) : Observable<CompetitorContact_DTO>
  {
    const url = `${this.apiUrl}/addCompetitorContact`
    const model = new CompetitorContact_DTO();
    model.competitorId = competitorId
    model.contactId = contactId
    return this.http.post<CompetitorContact_DTO>(url, model, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this))
    )
  }
  ListCompetitorContactsForCompetitor(competitorId: number): Observable<CompetitorContact_DTO[]>
  {
    const url = `${this.apiUrl}/listCompetitorContactsForCompetitor`
    const params = new HttpParams().set("id", competitorId)
    return this.http.get<CompetitorContact_DTO[]>(url, { headers: this.headers, params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }
  ListCompetitorContactsForContact(contactId: number): Observable<CompetitorContact_DTO[]>
  {
    const url = `${this.apiUrl}/listCompetitorContactsForContact`
    const params = new HttpParams().set("id", contactId)
    return this.http.get<CompetitorContact_DTO[]>(url, { headers: this.headers, params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }
  DeleteCompetitorContact(contact:CompetitorContact_DTO)
  {
    const url = `${this.apiUrl}/deleteCompetitorContact`
    const body = JSON.stringify(contact)
    return this.http.delete(url, {headers: this.headers, body: body}).pipe(
      catchError(this.handleError.bind(this)))
  }
  AddCustomerContact(customerId: number, contactId: number): Observable<CustomerContact_DTO>
  {
    const url = `${this.apiUrl}/addCustomerContact`
    const model = new CustomerContact_DTO();
    model.customerId = customerId
    model.contactId = contactId
    return this.http.post<CustomerContact_DTO>(url,model, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this))
    )
  }
  ListCustomerContactsForCustomer(customerId: number) : Observable<CustomerContact_DTO[]>
  {
    const url = `${this.apiUrl}/listCustomerContactsForCustomer`
    const params = new HttpParams().set("id", customerId)
    return this.http.get<CustomerContact_DTO[]>(url, { headers: this.headers, params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }
  ListCustomerContactsForContact(contactId: number) : Observable<CustomerContact_DTO[]>
  {
    const url = `${this.apiUrl}/listCustomerContactsForContact`
    const params = new HttpParams().set("id", contactId)
    return this.http.get<CustomerContact_DTO[]>(url, { headers: this.headers, params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }
  DeleteCustomerContact(contact: CustomerContact_DTO)
  {
    const url = `${this.apiUrl}/deleteCustomerContact`
    const body = JSON.stringify(contact)
    return this.http.delete(url, {headers: this.headers, body: body}).pipe(
      catchError(this.handleError.bind(this)))
  }
  AddManufacturerContact(manufacturerId: number, contactId: number): Observable<ManufacturerContact_DTO>
  {
    const url = `${this.apiUrl}/addManufacturerContact`
    const model = new ManufacturerContact_DTO();
    model.manufacturerId = manufacturerId
    model.contactId = contactId
    return this.http.post<ManufacturerContact_DTO>(url,model, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this))
    )
  }
  ListManufacturerContactsForManufacturer(manufacturerId: number) : Observable<ManufacturerContact_DTO[]>
  {
    const url = `${this.apiUrl}/listManufacturerContactsForManufacturer`
    const params = new HttpParams().set("id", manufacturerId)
    return this.http.get<ManufacturerContact_DTO[]>(url, { headers: this.headers, params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }
  ListManufacturerContactsForContact(contactId: number) : Observable<ManufacturerContact_DTO[]>
  {
    const url = `${this.apiUrl}/listManufacturerContactsForContact`
    const params = new HttpParams().set("id", contactId)
    return this.http.get<ManufacturerContact_DTO[]>(url, { headers: this.headers, params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }
  DeleteManufacturerContact(contact: ManufacturerContact_DTO)
  {
    const url = `${this.apiUrl}/deleteManufacturerContact`
    const body = JSON.stringify(contact)
    return this.http.delete(url, {headers: this.headers, body: body}).pipe(
      catchError(this.handleError.bind(this)))
  }
  AddVendorContact(vendorId: number, contactId: number) : Observable<VendorContact_DTO>
  {
    const url = `${this.apiUrl}/addVendorContact`
    const model = new VendorContact_DTO();
    model.vendorId = vendorId
    model.contactId = contactId
    return this.http.post<VendorContact_DTO>(url,model, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this))
    )
  }
  ListVendorContactsForVendor(vendorId: number) : Observable<VendorContact_DTO[]>
  {
    const url = `${this.apiUrl}/listVendorContactsForVendor`
    const params = new HttpParams().set("id", vendorId)
    return this.http.get<VendorContact_DTO[]>(url, { headers: this.headers, params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }
  ListVendorContactsForContact(contactId: number) : Observable<VendorContact_DTO[]>
  {
    const url = `${this.apiUrl}/listVendorContactsForContact`
    const params = new HttpParams().set("id", contactId)
    return this.http.get<VendorContact_DTO[]>(url, { headers: this.headers, params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }
  DeleteVendorContact(contact: VendorContact_DTO)
  {
    const url = `${this.apiUrl}/deleteVendorContact`
    const body = JSON.stringify(contact)
    return this.http.delete(url, {headers: this.headers, body: body}).pipe(
      catchError(this.handleError.bind(this)))
  }
  AddVenueContact(venueId: number, contactId: number): Observable<VenueContact_DTO>
  {
    const url = `${this.apiUrl}/addVenueContact`
    const model = new VenueContact_DTO();
    model.venueId = venueId
    model.contactId = contactId
    return this.http.post<VenueContact_DTO>(url, model, {headers: this.headers}).pipe(
      catchError(this.handleError.bind(this))
    )
  }
  ListVenueContactsForVenue(vendorId: number) : Observable<VenueContact_DTO[]>
  {
    const url = `${this.apiUrl}/listVenueContactsForVenue`
    const params = new HttpParams().set("id", vendorId)
    return this.http.get<VenueContact_DTO[]>(url, { headers: this.headers, params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }
  ListVenueContactsForContact(contactId: number) : Observable<VenueContact_DTO[]>
  {
    const url = `${this.apiUrl}/listVenueContactsForContact`
    const params = new HttpParams().set("id", contactId)
    return this.http.get<VenueContact_DTO[]>(url, { headers: this.headers, params: params }).pipe(
      catchError(this.handleError.bind(this)))
  }
  DeleteVenueContact(contact: VenueContact_DTO)
  {
    const url = `${this.apiUrl}/deleteVenueContact`
    const body = JSON.stringify(contact)
    return this.http.delete(url, {headers: this.headers, body: body}).pipe(
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
