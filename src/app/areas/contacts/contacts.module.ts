import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContactsComponent } from './components/list-contacts/list-contacts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { AddContactModalComponent } from './components/contact-modal/add-contact.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddPhoneNumberModalComponent } from './components/phone-number-modal/add-phone-number-modal.component';
import { AddEmailAddressModalComponent } from './components/email-address-modal/add-email-address-modal.component';
import { AddAddressFormComponent } from './components/address-form/address-form.component';



@NgModule({
  declarations: [
    ListContactsComponent,
    ViewContactComponent,
    AddContactModalComponent,
    DashboardComponent,
    AddAddressFormComponent,
    AddPhoneNumberModalComponent,
    AddEmailAddressModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      // { path: 'contacts/listcontacts', component: ListContactsComponent },
      // { path: 'contacts/viewcontact/:id', component: ViewContactComponent },
      { path: 'contacts/dashboard', component: DashboardComponent },
      { path: 'contacts/dashboard/:id', component: DashboardComponent },
    ]),
    SharedModule
  ]
})
export class ContactsModule { }
