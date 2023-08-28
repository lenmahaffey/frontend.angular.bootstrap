import { Component, OnDestroy } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Message } from '../../message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss']
})
export class NotificationManagerComponent implements OnDestroy{

  messages: Message[] = []
  incoming: Subscription
  constructor(private _service: NotificationService){
    this.incoming = this._service.message.subscribe(data =>
      {
        this.messages.push(data)
      })
  }

  deleteMessage(message:Message)
  {
    let i = this.messages.indexOf(message)
    this.messages.splice(i, 1)
  }

  ngOnDestroy(): void {
    this.incoming.unsubscribe();
  }

}
