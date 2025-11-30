import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';

@Component({
  selector: 'app-confirmation-demo',
  templateUrl: './confirmation-demo.component.html',
  styleUrl: './confirmation-demo.component.scss',
  standalone: false
})
export class ConfirmationDemoComponent {

  notificationFormData: FormGroup

  constructor(private appStateService: AppStateService) {
    this.notificationFormData = new FormGroup({
      type: new FormControl(MessageType.Success),
      title: new FormControl("Enter Title text"),
      text: new FormControl("Enter alert text"),
    });
  }

  openConfirmation() {
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
