import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DemoComponent } from './demo/demo.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RightSideBarTextComponent } from './demo/right-side-bar-text/right-side-bar-text.component';
import { SwatchComponent } from './demo/swatch/swatch.component';
import { ServicesModule } from "src/app/services/services.module";



@NgModule({
  declarations: [
    WelcomeComponent,
    PageNotFoundComponent,
    DemoComponent,
    RightSideBarTextComponent,
    SwatchComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        { path: 'demo', component: DemoComponent },
    ]),
    ServicesModule
]
})
export class PagesModule { }
