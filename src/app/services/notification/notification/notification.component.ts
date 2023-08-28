import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../../message';
import { MessageType } from '../../message-type.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations:[
    trigger('visible', [
      state('visible',
        style({
          transform: 'translateY(0%)',
          opacity: 1
        })),
      state('void, hidden',
        style({
          transform: 'translateY(-20%)',
          opacity: 0,
        })),
      state('dismissed',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        })),
      transition('* => visible', animate('500ms')),
      transition('visible => dismissed', animate('500ms')),
    ])
  ]
})
export class NotificationComponent implements AfterViewInit {

  constructor(private cdr: ChangeDetectorRef){}

  ngAfterViewInit(): void {
    this.isVisible = 'visible';
    this.cdr.detectChanges()
  }

  @Input() message: Message = new Message(MessageType.Success)
  @Output() dismissed: EventEmitter<Message> = new EventEmitter<Message>();
  isVisible: string = 'hidden'

  onDismissedAnimationEnd(event: any)
  {
    if(event.toState == "dismissed")
    {
      this.dismissed.emit(this.message)
    }
  }
  getIconClass()
  {
    switch(this.message.type)
    {
      case 2:
        return "fa-solid fa-circle-xmark fa-xl text-danger me-2"
      case 0:
        return "fa-solid fa-circle-check fa-xl text-success me-2";
      case 1:
        return "fa-solid fa-circle-exclamation fa-xl text-warning me-2";
      default:
        return "";
    }
  }

  getBorderClass()
  {
    switch(this.message.type)
    {
      case MessageType.Error:
        return "errorBorder"
      case MessageType.Success:
        return "successBorder";
      case MessageType.Warning:
        return "warningBorder";
      default:
        return "";
    }
  }

  dismissNotification()
  {
    this.isVisible = "dismissed"
  }
}
