import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state-service';

@Component({
  selector: 'app-right-side-bar-text',
  templateUrl: './right-side-bar-text.component.html',
  styleUrls: ['./right-side-bar-text.component.scss']
})
export class RightSideBarTextComponent implements OnInit {
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
