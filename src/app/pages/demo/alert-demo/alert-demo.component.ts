import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';

@Component({
  selector: 'app-alert-demo',
  templateUrl: './alert-demo.component.html',
  styleUrl: './alert-demo.component.scss',
  standalone: false
})
export class AlertDemoComponent {

  keys: any[] = []
  values: any[] = []
  alertMessageFormData: FormGroup

  constructor(private appStateService: AppStateService) {
    this.alertMessageFormData = new FormGroup({
      type: new FormControl(MessageType.Success),
      title: new FormControl(""),
      text: new FormControl("Enter alert text"),
      dismiss: new FormControl(false),
      duration: new FormControl({value: 1, disabled: true})
    });
    this.values = Object.values(MessageType).filter(f => !isNaN(Number(f)));
    this.values.forEach(value =>{
      this.keys.push(MessageType[value])
    })
  }

  sendAlert() {
    var message = new Message()
    message.type =  Number(this.alertMessageFormData.value.type)
    // message.title = "" //Unused with alerts
    message.text = this.alertMessageFormData.value.text
    message.autoDismiss = this.alertMessageFormData.value.dismiss
    message.duration = this.alertMessageFormData.value.duration
    console.log("Demo", message)
    this.appStateService.sendAlert(message);
  }
}
