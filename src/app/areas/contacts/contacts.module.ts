import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContactsComponent } from './pages/list-contacts/list-contacts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';



@NgModule({
  declarations: [
    ListContactsComponent,
    ViewContactComponent,
    AddContactComponent,
    DashboardComponent
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
