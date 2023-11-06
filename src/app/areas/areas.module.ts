import { NgModule } from '@angular/core';
import { GraphsModule } from './graphs/graphs.module';
import { UsersModule } from './users/users.module';
import { InventoryModule } from './inventory/inventory.module';
import { SalesModule } from './sales/sales.module';
import { ContactsModule } from './contacts/contacts.module';


@NgModule({
  declarations: [
  ],
  imports: [
    GraphsModule,
    UsersModule,
    InventoryModule,
    SalesModule,
    ContactsModule
  ]
})

export class AreasModule { }
