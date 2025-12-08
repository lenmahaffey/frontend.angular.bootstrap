import { ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
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
  tooltip: ElementRef
  sub: Subscription
  cdr: ChangeDetectorRef
  constructor(appStateService: AppStateService, elementRef: ElementRef, cdr: ChangeDetectorRef) {
    this.cdr = cdr
    this.tooltip = elementRef
    this.sub = appStateService.toolTipOptions.subscribe(
    {
      next: (data) =>
      {
        if(!data){
          this.isVisible = false
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
    // this.tooltip.nativeElement.style.position = 'absolute'
    // this.tooltip.nativeElement.style.top = (e.clientY + 15) + "px";
    // this.tooltip.nativeElement.style.left = (e.clientX) + "px";
  }
}
