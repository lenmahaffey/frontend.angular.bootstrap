import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state/app-state-service';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent implements OnDestroy{

  appStateSubscription: Subscription
  menuItems: any

  constructor(private appStateService: AppStateService)
  {
    this. appStateSubscription = this.appStateService.leftSideNavMenuItems.subscribe(data => {
      this.menuItems = data
    })
  }
  ngOnDestroy(): void {
    this.appStateSubscription.unsubscribe;
  }
}
