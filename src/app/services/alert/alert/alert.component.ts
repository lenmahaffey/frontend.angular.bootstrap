import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from '../../message';
import { MessageType } from '../../message-type.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations:[
    trigger('visible', [
    state('visible',
      style({
        transform: 'translateY(-0%)',
        opacity: 1
      })
    ),
    state('void, hidden',
      style({
        transform: 'translateY(-20%)',
        opacity: 0,
      })
    ),
    transition('* => visible', animate('500ms')),
    transition('* => void, * => hidden', animate('500ms'))
  ])
  ]
})
export class AlertComponent implements AfterViewInit{

  @Input() message: Message = new Message(MessageType.Success)
  @Output() dismissed: EventEmitter<Message> = new EventEmitter<Message>();
  animation: string = "showAlert"
  isVisible= 'hidden'

  constructor(private cdr: ChangeDetectorRef){}
  ngAfterViewInit(): void {
    if(this.message.autoDismiss)
    {
      this.dismissAlertInTime(this.message.duration * 1000)
    }
    this.isVisible = 'visible'
    this.cdr.detectChanges();
  }

  getBackgroundClass()
  {
    switch(this.message.type)
    {
      case MessageType.Error:
        return "alert-danger"
      case MessageType.Success:
        return "alert-success";
      case MessageType.Warning:
        return "alert-warning";
      default:
        return "";
    }
  }

  onHiddenAnimationEnd(event: any){
    if(event.toState == 'void' || event.toState == 'hidden')
    {
      this.dismissed.emit(this.message)
    }
  }

  dismissAlert()
  {
    this.isVisible = 'hidden'
  }

  async dismissAlertInTime(timeToWait: number ) {
    await this.sleep(timeToWait);
    this.dismissAlert()
  }

  sleep = async (milliseconds: number) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};
}
