import { Component, OnDestroy, OnInit, TemplateRef, isDevMode } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { LeftSideBarNavLinks } from './left-side-bar-nav-links';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    standalone: false
})

export class DemoComponent implements OnDestroy, OnInit {


  constructor(private appState: AppStateService) {
    this.appState.setLeftSideMenuItems(new LeftSideBarNavLinks())
  }

  ngOnInit(): void {
    console.log("Environemnt Name: " + environment.name + (isDevMode() ? " is a developemnt environemnt" : " is a production environment"));
  }

  ngOnDestroy(): void {
    this.appState.setLeftSideMenuItems()
  }
}
