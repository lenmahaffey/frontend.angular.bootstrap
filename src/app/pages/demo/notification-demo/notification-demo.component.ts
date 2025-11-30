import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';

@Component({
  selector: 'app-notification-demo',
  templateUrl: './notification-demo.component.html',
  styleUrl: './notification-demo.component.scss',
  standalone: false
})
export class NotificationDemoComponent {
  keys: any[] = []
  values: any[] = []
  notificationFormData: FormGroup

  constructor(private appStateService: AppStateService) {
    this.notificationFormData = new FormGroup({
      type: new FormControl(MessageType.Success),
      title: new FormControl("Enter Title text"),
      text: new FormControl("Enter alert text"),
    });
    this.values = Object.values(MessageType).filter(f => !isNaN(Number(f)));
    this.values.forEach(value =>{
      this.keys.push(MessageType[value])
    })
  }

  sendNotification() {
      var message = new Message()
      message.type =  Number(this.notificationFormData.value.type)
      // message.title = "" //Unused with alerts
      message.text = this.notificationFormData.value.text
      message.autoDismiss = this.notificationFormData.value.dismiss
      message.duration = this.notificationFormData.value.duration
      console.log("Demo", message)
      this.appStateService.sendAlert(message);
    }
}
