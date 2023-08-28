import { Component, Input } from '@angular/core';
import { ToolTipPosition } from '../tooltip-position';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
  @Input() text: string = ""
  @Input() isVisible: string = "invisible"
  @Input() position: ToolTipPosition = new ToolTipPosition();

  get top(): string{ return (this.position.y).toString() + "px"}
  get left(): string{ return (this.position.x + 15).toString() + "px"}
}
