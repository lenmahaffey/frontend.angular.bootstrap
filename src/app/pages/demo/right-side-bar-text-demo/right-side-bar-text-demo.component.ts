import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state.service';

@Component({
    selector: 'app-right-side-bar-demo-text',
    templateUrl: './right-side-bar-text-demo.component.html',
    styleUrls: ['./right-side-bar-text-demo.component.scss'],
    standalone: false
})
export class RightSideBarTextDemoComponent implements OnInit {
  @ViewChild('sideNavText', {static : true}) sideNavText : TemplateRef<any> | undefined;

  constructor(private _appStateService: AppStateService)
  {}

  ngOnInit(): void {
    if(this.sideNavText != undefined)
    {
      this._appStateService.setRightSideNav(this.sideNavText)
    }
  }
}
