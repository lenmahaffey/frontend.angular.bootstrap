import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';
import { RouterModule } from '@angular/router';
import { UsersService } from './users.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddressFormComponent } from '../contacts/components/address-form/address-form.component';
import { ContactsModule } from '../contacts/contacts.module';



@NgModule({
  declarations: [
    ListUsersComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'users/listusers', component: ListUsersComponent },
      { path: 'users/adduser', component: EditUserComponent },
      { path: 'users/edituser/:id', component: EditUserComponent },
    ]),
    SharedModule,
    ContactsModule
  ],
  providers:[UsersService]
})
export class UsersModule { }
