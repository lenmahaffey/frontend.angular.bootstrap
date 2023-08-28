import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state/app-state-service';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss']
})
export class RightSideBarComponent implements OnDestroy{

  appStateSubscription: Subscription
  sideBarTemplate: any
  animation: string = "hidden"

  constructor(private _appStateService: AppStateService) {
    this.appStateSubscription = this._appStateService.rightSideText.subscribe(data =>
      {
        this.sideBarTemplate = data
      })
  }
  ngOnDestroy(): void {
    this.appStateSubscription.unsubscribe()
  }

  toggleVisibility()
  {
    this.animation =  (this.animation == "showContainer") ? "hideContainer" : "showContainer"
  }
}
