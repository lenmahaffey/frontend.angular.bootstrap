import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DemoComponent } from './demo/demo.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RightSideBarTextComponent } from './demo/right-side-bar-text/right-side-bar-text.component';
import { SwatchComponent } from './demo/swatch/swatch.component';
import { ServicesModule } from "src/app/services/services.module";
import { SpinnerDemoComponent } from "./demo/spinner-demo/spinner-demo.component";
import { ConfirmationDemoComponent } from "./demo/confirmation-demo/confirmation-demo.component";
import { AlertDemoComponent } from './demo/alert-demo/alert-demo.component';
import { NotificationDemoComponent } from './demo/notification-demo/notification-demo.component';



@NgModule({
  declarations: [
    WelcomeComponent,
    PageNotFoundComponent,
    DemoComponent,
    RightSideBarTextComponent,
    SwatchComponent,
    SpinnerDemoComponent,
    ConfirmationDemoComponent,
    AlertDemoComponent,
    NotificationDemoComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        { path: 'demo', component: DemoComponent },
    ]),
    ServicesModule,
]
})
export class PagesModule { }
