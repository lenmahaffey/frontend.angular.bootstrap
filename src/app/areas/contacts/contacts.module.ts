import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContactsComponent } from './components/list-contacts/list-contacts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { AddOrEditContactComponent } from './components/add-or-edit-contact/add-or-edit-contact.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddOrEditPhoneNumberComponent } from './components/add-or-edit-phone-number/add-or-edit-phone-number.component';
import { AddOrEditEmailAddressComponent } from './components/add-or-edit-email-address/add-or-edit-email-address.component';
import { AddOrEditPhysicalAddressComponent } from './components/add-or-edit-physical-address/add-or-edit-physical-address.component';
import { CustomerContactsComponent } from './components/customer-contacts/customer-contacts.component';
import { CompetitorContactsComponent } from './components/competitor-contacts/competitor-contacts.component';
import { ManufacturerContactsComponent } from './components/manufacturer-contacts/manufacturer-contacts.component';
import { VendorContactsComponent } from './components/vendor-contacts/vendor-contacts.component';
import { VenueContactsComponent } from './components/venue-contacts/venue-contacts.component';
import { AddContactAsComponent } from './components/add-contact-as/add-contact-as.component';

@NgModule({
  declarations: [
    AddContactAsComponent,
    ListContactsComponent,
    ViewContactComponent,
    AddOrEditContactComponent,
    DashboardComponent,
    AddOrEditPhysicalAddressComponent,
    AddOrEditPhoneNumberComponent,
    AddOrEditEmailAddressComponent,
    CustomerContactsComponent,
    CompetitorContactsComponent,
    ManufacturerContactsComponent,
    VendorContactsComponent,
    VenueContactsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'contacts', component: DashboardComponent },
      { path: 'contacts/:id', component: DashboardComponent },
    ]),
    SharedModule
  ]
})
export class ContactsModule { }
