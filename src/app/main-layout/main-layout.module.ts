import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './right-side-bar/right-side-bar.component';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { ServicesModule } from '../services/services.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LeftSideBarComponent,
    RightSideBarComponent,
    MainLayoutComponent
  ],
  imports: [
    ServicesModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    MainLayoutComponent
  ]
})
export class MainLayoutModule { }
