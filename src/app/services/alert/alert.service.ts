import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../message';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  message: Subject<Message> = new Subject<Message>()

  constructor() { }

  sendAlert(message: Message)
  {
    this.message.next(message);
  }
}
