import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../../message';
import { MessageType } from '../../message-type.interface';
import * as animations from '@angular/animations';
import { Constants } from 'src/app/constants';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [
        animations.trigger('visible', [
            animations.state('visible', animations.style({
                transform: 'translateY(-0%)',
                opacity: 1
            })),
            animations.state('void, hidden', animations.style({
                transform: 'translateY(-20%)',
                opacity: 0,
            })),
            animations.transition('* => visible', animations.animate('500ms')),
            animations.transition('* => void, * => hidden', animations.animate('500ms'))
        ])
    ],
    standalone: false
})
export class AlertComponent implements AfterViewInit {

  @Input() message: Message = new Message(MessageType.Success)
  @Output() dismissed: EventEmitter<Message> = new EventEmitter<Message>();
  animation: string = "showAlert"
  isVisible= 'hidden'
  backgroundClass: string = ""
  constructor(private cdr: ChangeDetectorRef){}
  ngAfterViewInit(): void {
    this.getBackgroundClass();
    if(this.message.autoDismiss)
    {
      this.dismissAlertInTime(this.message.duration)
    }
    this.isVisible = 'visible'
    this.cdr.detectChanges();
  }

  getBackgroundClass()
  {
    console.log("Alert Type: ", this.message.type)
    switch(this.message.type)
    {
      case MessageType.Success || 0:
        console.log("Class: alert-success")
        this.backgroundClass = "alert-success"
        return
      case MessageType.Warning || 1:
        console.log("Class: alert-warning")
        this.backgroundClass = "alert-warning";
        return
      case MessageType.Error || 2:
        console.log("Class: alert-danger")
        this.backgroundClass = "alert-danger";
        return
      default:
        this.backgroundClass = "";
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
    this.message.isDismissed = true
  }

  async dismissAlertInTime(timeToWaitInSeconds: number) {
    await Constants.wait(timeToWaitInSeconds);
    this.dismissAlert()
  }
}
