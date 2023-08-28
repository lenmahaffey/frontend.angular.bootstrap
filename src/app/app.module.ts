import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AreasModule } from './areas/areas.module';
import { PagesModule } from './pages/pages.module';
import { ServicesModule } from './services/services.module';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { AlertService } from './services/alert/alert.service';
import { NotificationService } from './services/notification/notification.service';
import { DemoComponent } from './pages/demo/demo.component';
import { AppStateService } from './services/app-state/app-state-service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AreasModule,
    PagesModule,
    ServicesModule,
    MainLayoutModule,
    RouterModule.forRoot([
      { path: '', component: DemoComponent },
      { path: 'demo', component: DemoComponent },
      { path: '**', component: PageNotFoundComponent }
    ]),
  ],
  providers: [AlertService, NotificationService, AppStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
