import { NgModule } from '@angular/core';
import { GraphsModule } from './graphs/graphs.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
  ],
  imports: [
    GraphsModule,
    UsersModule
  ]
})

export class AreasModule { }
