export interface IToolTipOptions {
  event:MouseEvent
  text: string
}

export class ToolTipOptions implements IToolTipOptions
{
  event: MouseEvent
  text: string = "Are you sure?"
  constructor(event: MouseEvent, text: string = "") {
    this.event = event,
    this.text = text
  }
}
