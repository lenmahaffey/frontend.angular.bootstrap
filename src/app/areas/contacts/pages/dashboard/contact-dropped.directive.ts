import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appContactDropped]'
})
export class ContactDroppedDirective {

  constructor() { }

  @HostListener('drop',['$event']) public ondrop(evt: Event)
  {
    evt.preventDefault()
    evt.stopPropagation()
    console.log(evt)
  }

  @HostListener('dragover',['$event']) public onDragOver(evt: Event)
  {
    evt.preventDefault()
    evt.stopPropagation()
    console.log(evt)
  }

  // @HostListener('mouseenter',['$event']) public onMouseEnter(evt: Event)
  // {
  //   console.log(evt)
  //   evt.preventDefault()
  //   evt.stopPropagation()
  // }
}
