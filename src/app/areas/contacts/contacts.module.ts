import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContactsComponent } from './components/list-contacts/list-contacts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddPhoneNumberModalComponent } from './components/add-phone-number-modal/add-phone-number-modal.component';
import { AddEmailAddressModalComponent } from './components/add-email-address-modal/add-email-address-modal.component';
import { ContactDroppedDirective } from './pages/dashboard/contact-dropped.directive';
import { AddAddressFormComponent } from './components/add-address-form/address-form.component';



@NgModule({
  declarations: [
    ListContactsComponent,
    ViewContactComponent,
    AddContactComponent,
    DashboardComponent,
    AddAddressFormComponent,
    AddPhoneNumberModalComponent,
    AddEmailAddressModalComponent,
    ContactDroppedDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'contacts/listcontacts', component: ListContactsComponent },
      { path: 'contacts/viewcontact:id', component: ViewContactComponent },
      { path: 'contacts/dashboard', component: DashboardComponent },
    ]),
    SharedModule
  ]
})
export class ContactsModule { }
