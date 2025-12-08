import { Directive, Input } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { ToolTipOptions } from './tooltip-options';

@Directive({
  selector: '[tooltip]',
  host: {
    '(mouseenter)': 'showToolTip($event)',
    '(mouseleave)': 'hideToolTip()',
    '(mousemove)': 'updateToolTipPosition($event)'
  },
  standalone: false
})
export class TooltipDirective {

  @Input() text: string = ""
  constructor(private appStateService: AppStateService) { }

  showToolTip(event:MouseEvent){
    const options = new ToolTipOptions(event, this.text)
    this.appStateService.toolTipOptions.next(options)
  }

  hideToolTip(){
    this.appStateService.toolTipOptions.next(null);
  }

  updateToolTipPosition(event: Event){
    let temp = event as MouseEvent
    const options = new ToolTipOptions(temp, this.text)
    this.appStateService.toolTipOptions.next(options)
  }
}
