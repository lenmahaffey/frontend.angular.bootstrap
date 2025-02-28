import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    standalone: false
})
export class MainLayoutComponent {
  envName: string
  constructor() {
    this.envName = environment.name
    this.getEnvironmentBorderName()
   }

   getEnvironmentBorderName()
   {
    switch (environment.name){
      case "development": {
        return "devBorder"
      }
      case "qa": {
        return "qaBorder"
      }
      case "stage": {
        return "stageBorder"
      }
      default: {
        return ""
      }
    }
   }
}
