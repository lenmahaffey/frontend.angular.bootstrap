import { Injectable } from '@angular/core';
import { Message } from '../message';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  message: Subject<Message> = new Subject<Message>()

  constructor() { }

  sendNotification(message: Message)
  {
    this.message.next(message);
  }
}
