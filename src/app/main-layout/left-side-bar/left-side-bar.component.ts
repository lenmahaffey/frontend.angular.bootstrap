import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { MenuItems } from 'src/app/shared/menu-items';

@Component({
    selector: 'app-left-side-bar',
    templateUrl: './left-side-bar.component.html',
    styleUrls: ['./left-side-bar.component.scss'],
    standalone: false
})
export class LeftSideBarComponent implements OnDestroy{

  appStateSubscription: Subscription
  menuItems?: MenuItems

  constructor(private appStateService: AppStateService)
  {
    this. appStateSubscription = this.appStateService.leftSideNavMenuItems.subscribe(data => {
      this.menuItems = data
    })
  }
  ngOnDestroy(): void {
    this.appStateSubscription.unsubscribe;
  }

  toggleDislay(e: HTMLElement){
    if(e.classList.contains('active')){
      e.classList.remove('active');
      (e.nextElementSibling as HTMLElement).style.display = "none"
    }
    else{
      e.classList.add('active');
      (e.nextElementSibling as HTMLElement).style.display = "block"
    }
  }
}
