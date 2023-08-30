import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';
import { RouterModule } from '@angular/router';
import { UsersService } from './users.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddressFormComponent } from './edit-user/address-form/address-form.component';



@NgModule({
  declarations: [
    ListUsersComponent,
    EditUserComponent,
    AddressFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'users/listusers', component: ListUsersComponent },
      { path: 'users/adduser', component: EditUserComponent },
      { path: 'users/edituser/:id', component: EditUserComponent },
    ]),
    SharedModule
  ],
  providers:[UsersService]
})
export class UsersModule { }
