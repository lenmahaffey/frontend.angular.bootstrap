import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';

@Component({
  selector: 'app-confirmation-demo',
  templateUrl: './confirmation-demo.component.html',
  styleUrl: './confirmation-demo.component.scss',
  standalone: false
})
export class ConfirmationDemoComponent {

  notificationFormData: FormGroup
  confirmationResponseMessage: string = "Please open the confimation dialog and make a selection"

  constructor(private appStateService: AppStateService) {
    this.notificationFormData = new FormGroup({
      type: new FormControl(MessageType.Success),
      title: new FormControl("Enter Title text"),
      text: new FormControl("Enter alert text"),
    });
  }
  openConfirmationDialog()
  {
    const options = new ConfirmationDialogOptions()
    options.text = "This is a dialog"
    options.title = "Confirmation Dialog"
    let sub = this.appStateService.openConfirmationDialog(options).subscribe(
      {
        next: (data) =>
        {
          this.setConfirmationResponseMessage(data)
          this.appStateService.closeDialog()
          sub.unsubscribe()
        },
        error: () =>
        {
          let message = new Message()
          message.type = MessageType.Error
          message.text = "There was an error"
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      })
  }

  setConfirmationResponseMessage(data: boolean | null)
  {
    if(data == null)
    {
      this.confirmationResponseMessage = "You did not make a selection"
    }
    else if(data)
    {
      this.confirmationResponseMessage = "You clicked yes"
    }
    else
    {
      this.confirmationResponseMessage = this.confirmationResponseMessage = "You clicked no"
    }
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
