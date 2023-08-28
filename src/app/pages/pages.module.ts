import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DemoComponent } from './demo/demo.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RightSideBarTextComponent } from './demo/right-side-bar-text/right-side-bar-text.component';
import { ColorSwatchesComponent } from './demo/color-swatches/color-swatches.component';
import { SwatchComponent } from './demo/color-swatches/swatch/swatch.component';



@NgModule({
  declarations: [
    WelcomeComponent,
    PageNotFoundComponent,
    DemoComponent,
    RightSideBarTextComponent,
    ColorSwatchesComponent,
    SwatchComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'demo', component: DemoComponent },
    ]),
  ]
})
export class PagesModule { }
