import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state/app-state.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  standalone: true
})
export class TooltipComponent implements OnDestroy {

  isVisible: boolean = false
  top: string = "0px"
  left: string = "0px"
  text: string = "Tooltip"
  sub: Subscription
  constructor(appStateService: AppStateService) {
    this.sub = appStateService.toolTipOptions.subscribe(
    {
      next: (data) =>
      {
        if(!data){
          this.isVisible = false
          this.text = ""
        } else {
          this.isVisible = true
          this.text = data.text
          this.updatePosition(data.event)
        }
      },
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  updatePosition(e:MouseEvent) {
    this.top = (e.clientY + 15) + "px";
    this.left = (e.clientX) + "px";
  }
}
