import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ViewContactComponent } from './view-contact/view-contact.component';



@NgModule({
  declarations: [
    ListContactsComponent,
    ViewContactComponent
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
