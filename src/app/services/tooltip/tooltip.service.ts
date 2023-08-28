import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToolTipPosition } from './tooltip-position';

@Injectable({
  providedIn: 'root'
})
export class ToolTipService {

  text: Subject<any> = new Subject<any>()
  isVisible: Subject<boolean> = new Subject<boolean>()
  clearText: Subject<boolean> = new Subject<boolean>()
  position: Subject<ToolTipPosition> = new Subject<ToolTipPosition>()

  constructor() { }

  sendText(text:string)
  {
    this.text.next(text)
  }

  toggleVisibility()
  {
    this.isVisible.next(true);
  }

  setPosition(position: ToolTipPosition)
  {
    this.position.next(position)
  }

  clearToolTip()
  {
    this.clearText.next(true);
  }
}
