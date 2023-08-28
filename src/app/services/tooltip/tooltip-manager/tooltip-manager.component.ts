import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToolTipService } from '../tooltip.service';
import { ToolTipPosition } from '../tooltip-position';

@Component({
  selector: 'app-tooltip-manager',
  templateUrl: './tooltip-manager.component.html',
  styleUrls: ['./tooltip-manager.component.scss']
})
export class TooltipManagerComponent implements OnDestroy {
  isVisible:Subscription
  text: Subscription
  position:Subscription

  visibility: string = "invisible"
  toolTipText = ""
  toolTipPosition = new ToolTipPosition()

  constructor(private toolTipService: ToolTipService)
  {
    this.isVisible = toolTipService.isVisible.subscribe(data =>
      {
        this.visibility = (this.visibility== "visible" ? "invisible" : "visible")
      })

    this.text = toolTipService.text.subscribe(data =>
      {
        this.toolTipText = data
      })

    this.position = toolTipService.position.subscribe(data =>
      {
        this.toolTipPosition = data
      })
  }
  ngOnDestroy(): void {
    this.isVisible.unsubscribe();
  }
}
