import { Component, OnDestroy } from '@angular/core';
import { Message } from '../../message';
import { Subscription } from 'rxjs';
import { AlertService } from '../alert.service';
import { MessageType } from '../../message-type.interface';

@Component({
    selector: 'app-alert-manager',
    templateUrl: './alert-manager.component.html',
    styleUrls: ['./alert-manager.component.scss'],
    standalone: false
})
export class AlertManagerComponent implements OnDestroy {

  messages: Message[] = []
  incoming: Subscription
  constructor(private _service: AlertService){
    this.incoming = this._service.message.subscribe(
      {
        next: (message) =>
        {
          this.clearMessages()
          this.messages.push(message)
        },
        error: () =>
        {

        },
        complete:() =>
        {
          this.incoming.unsubscribe()
        }
      })
  }

  deleteMessage(message:Message)
  {
    let i = this.messages.indexOf(message)
    this.messages.splice(i, 1)
  }

  clearMessages()
  {
    this.messages.forEach((m, i)=> {
      if (m.isDismissed)
      {
        this.messages.splice(i, 1)
      }
    })
  }

  ngOnDestroy(): void {
    this.incoming.unsubscribe()
  }
}
