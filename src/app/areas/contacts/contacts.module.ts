import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContactsComponent } from './pages/list-contacts/list-contacts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ViewAddressComponent } from './components/view-address/view-address.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AddPhoneNumberModalComponent } from './components/add-phone-number-modal/add-phone-number-modal.component';



@NgModule({
  declarations: [
    ListContactsComponent,
    ViewContactComponent,
    AddContactComponent,
    DashboardComponent,
    ViewAddressComponent,
    AddressFormComponent,
    AddPhoneNumberModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'contacts/listcontacts', component: ListContactsComponent },
      { path: 'contacts/viewcontact:id', component: ViewContactComponent },
    ]),
    SharedModule
  ]
})
export class ContactsModule { }
