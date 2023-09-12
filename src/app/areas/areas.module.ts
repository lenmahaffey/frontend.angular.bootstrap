import { NgModule } from '@angular/core';
import { GraphsModule } from './graphs/graphs.module';
import { UsersModule } from './users/users.module';
import { InventoryModule } from './inventory/inventory.module';


@NgModule({
  declarations: [
  ],
  imports: [
    GraphsModule,
    UsersModule,
    InventoryModule
  ]
})

export class AreasModule { }
